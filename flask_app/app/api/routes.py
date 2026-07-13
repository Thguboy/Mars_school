from flask import request, jsonify, session
import random
from app.api import bp
from app.utils import init_session
from app.models import User, Topic, Attendance
from app import db

@bp.route('/role', methods=['POST'])
def switch_role():
    init_session(session)
    data = request.json or {}
    new_role = data.get('role', 'student')
    if new_role not in ('student', 'teacher', 'admin'):
        return jsonify({"success": False, "message": "Noto'g'ri rol!"}), 400
    session['role'] = new_role
    session.modified = True
    return jsonify({"success": True, "role": new_role})

@bp.route('/admin/add_user', methods=['POST'])
def add_user():
    data = request.json or request.form
    email = data.get('email')
    username = data.get('username')
    password = data.get('password')
    role = data.get('role')
    salary = data.get('salary', 0.0)

    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "message": "Elektron pochta band!"}), 400

    new_user = User(username=username, email=email, role=role, salary=float(salary))
    if password:
        new_user.set_password(password)
        
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"success": True})

@bp.route('/admin/update_salary', methods=['POST'])
def update_salary():
    data = request.json or request.form
    user_id = data.get('user_id')
    new_salary = data.get('salary')
    
    user = User.query.get(user_id)
    if user and user.role == 'teacher':
        user.salary = float(new_salary)
        db.session.commit()
        return jsonify({"success": True})
    return jsonify({"success": False, "message": "O'qituvchi topilmadi!"}), 404

@bp.route('/admin/add_coins_to_teacher', methods=['POST'])
def add_coins_to_teacher():
    """Admin gives coin budget to a Teacher. Teacher can only spend these coins on students."""
    data = request.json or request.form
    teacher_id = data.get('teacher_id')
    coins = int(data.get('coins', 0))
    
    teacher = User.query.get(teacher_id)
    if teacher and teacher.role == 'teacher':
        teacher.coins += coins
        db.session.commit()
        return jsonify({"success": True, "new_balance": teacher.coins})
    return jsonify({"success": False, "message": "O'qituvchi topilmadi!"}), 404

@bp.route('/teacher/attendance', methods=['POST'])
def mark_attendance():
    data = request.json or request.form
    user_id = data.get('user_id')
    status = data.get('status')
    
    from datetime import date
    
    att = Attendance(user_id=user_id, status=status, date=date.today())
    db.session.add(att)
    db.session.commit()
    return jsonify({"success": True})

@bp.route('/teacher/assign_coins', methods=['POST'])
def assign_coins():
    """Teacher assigns coins from their budget to a student."""
    data = request.json or request.form
    student_id = data.get('user_id')
    teacher_id = data.get('teacher_id')
    coins = int(data.get('coins', 0))
    
    teacher = User.query.get(teacher_id)
    student = User.query.get(student_id)
    
    if not teacher or teacher.role != 'teacher':
        return jsonify({"success": False, "message": "O'qituvchi topilmadi"}), 404
    if not student:
        return jsonify({"success": False, "message": "O'quvchi topilmadi"}), 404
    if teacher.coins < coins:
        return jsonify({"success": False, "message": f"Yetarli coin yo'q! Sizda faqat {teacher.coins} coin bor."}), 400
    
    teacher.coins -= coins
    student.coins += coins
    db.session.commit()
    return jsonify({"success": True, "teacher_remaining": teacher.coins, "student_coins": student.coins})

@bp.route('/stats', methods=['GET'])
def get_stats():
    init_session(session)
    return jsonify({
        "wallet": session['wallet'],
        "streak": session['streak'],
        "coins": session['coins'],
        "energy": session['energy'],
        "subscription": session['subscription'],
        "role": session['role']
    })

@bp.route('/subscribe', methods=['POST'])
def subscribe():
    init_session(session)
    session['subscription'] = True
    session['energy'] += 500
    session.modified = True
    return jsonify({
        "success": True,
        "message": "Obuna muvaffaqiyatli faollashtirildi!",
        "energy": session['energy'],
        "subscription": session['subscription']
    })

@bp.route('/teacher/data', methods=['GET'])
def teacher_data():
    return jsonify({
        "stats": [
            {"label": "Guruhlar", "value": "8 ta", "icon": "users", "color": "blue"},
            {"label": "O'quvchilar", "value": "124 ta", "icon": "user", "color": "green"},
            {"label": "Reyting", "value": "4.9/5", "icon": "crown", "color": "yellow"}
        ],
        "groups": [
            {"name": "nBPro-340", "students": 18, "course": "Back-End PRO", "progress": 45},
            {"name": "nBPro-341", "students": 18, "course": "Back-End PRO", "progress": 60},
            {"name": "FE-201", "students": 18, "course": "Back-End PRO", "progress": 75}
        ],
        "pending_homework": [
            {"student": "Ali Valiyev", "task": "Node.js API project", "avatar": "hw1", "date": "Bugun"},
            {"student": "Dilnoza Karimova", "task": "Express middleware", "avatar": "hw2", "date": "Bugun"},
            {"student": "Jasur Toshmatov", "task": "REST API design", "avatar": "hw3", "date": "Kecha"}
        ]
    })

@bp.route('/admin/data', methods=['GET'])
def admin_data():
    return jsonify({
        "analytics": [45, 65, 30, 85, 55, 90, 70, 40, 80, 60, 95, 75],
        "months": ["Yan", "Feb", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"],
        "shop_stats": {"total_products": 45, "sold_this_month": 128},
        "activity_log": [
            {"user": "Jasur", "action": "Space Shopdan Hoodie sotib oldi", "time": "2 daq avval"},
            {"user": "Teacher Ali", "action": "FE-201 guruhiga dars qo'shdi", "time": "12 daq avval"},
            {"user": "Admin", "action": "Yangi \"Cyber Security\" kursi yaratildi", "time": "45 daq avval"},
            {"user": "Nodira", "action": "XP reytingida 1-o'ringa chiqdi", "time": "1 soat avval"}
        ]
    })

@bp.route('/payment', methods=['POST'])
def process_payment():
    init_session(session)
    data = request.json or {}
    try:
        amount = float(data.get('amount', 100000))
    except ValueError:
        return jsonify({"success": False, "message": "Noto'g'ri miqdor kiritildi!"}), 400
        
    if session['wallet'] < amount:
        return jsonify({"success": False, "message": "Hamyonda yetarli mablag' mavjud emas!"}), 400
        
    session['wallet'] -= amount
    session['streak'] += 1
    session['coins'] += 10
    session.modified = True
    
    return jsonify({
        "success": True,
        "message": f"{amount:,.0f} so'm muvaffaqiyatli to'landi!",
        "wallet": session['wallet'],
        "streak": session['streak'],
        "coins": session['coins']
    })

@bp.route('/shop/buy', methods=['POST'])
def shop_buy():
    init_session(session)
    data = request.json or {}
    item_id = data.get('id')
    
    items = session['shop_items']
    item = next((i for i in items if i['id'] == item_id), None)
    
    if not item:
        return jsonify({"success": False, "message": "Mahsulot topilmadi!"}), 404
        
    if item['stock'] <= 0:
        return jsonify({"success": False, "message": "Mahsulot omborda qolmagan!"}), 400
        
    if session['coins'] < item['price']:
        return jsonify({"success": False, "message": "Mars tangalaringiz (Coin) yetarli emas! 🪙"}), 400
        
    session['coins'] -= item['price']
    item['stock'] -= 1
    session.modified = True
    
    return jsonify({
        "success": True,
        "message": f"{item['name']} sotib olindi!",
        "coins": session['coins'],
        "items": session['shop_items']
    })

@bp.route('/blog/post', methods=['POST'])
def add_blog_post():
    init_session(session)
    data = request.json or {}
    content = data.get('content', '').strip()
    if not content:
        return jsonify({"success": False, "message": "Post matni bo'sh bo'lishi mumkin emas!"}), 400
        
    new_post = {
        "id": len(session['blog_posts']) + 1,
        "author": "Saidaxmatov Saidaziz",
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Saidaziz",
        "time": "Hozirgina",
        "image": "shaxsiy_rekord.png",
        "title": "Kayfiyat post",
        "content": content,
        "likes": 0,
        "liked": False,
        "comments": []
    }
    
    session['coins'] += 5
    session['blog_posts'].insert(0, new_post)
    session.modified = True
    
    return jsonify({
        "success": True,
        "posts": session['blog_posts'],
        "coins": session['coins']
    })

@bp.route('/blog/like', methods=['POST'])
def like_blog_post():
    init_session(session)
    data = request.json or {}
    post_id = data.get('id')
    
    posts = session['blog_posts']
    post = next((p for p in posts if p['id'] == post_id), None)
    
    if not post:
        return jsonify({"success": False, "message": "Post topilmadi!"}), 404
        
    if post.get('liked', False):
        post['likes'] -= 1
        post['liked'] = False
    else:
        post['likes'] += 1
        post['liked'] = True
        
    session.modified = True
    return jsonify({
        "success": True,
        "likes": post['likes'],
        "liked": post['liked']
    })

@bp.route('/blog/comment', methods=['POST'])
def comment_blog_post():
    init_session(session)
    data = request.json or {}
    post_id = data.get('id')
    comment_text = data.get('text', '').strip()
    
    if not comment_text:
        return jsonify({"success": False, "message": "Izoh bo'sh bo'lishi mumkin emas!"}), 400
        
    posts = session['blog_posts']
    post = next((p for p in posts if p['id'] == post_id), None)
    
    if not post:
        return jsonify({"success": False, "message": "Post topilmadi!"}), 404
        
    post['comments'].append({
        "author": "Saidaxmatov Saidaziz",
        "text": comment_text
    })
    
    session.modified = True
    return jsonify({
        "success": True,
        "comments": post['comments']
    })

@bp.route('/chat', methods=['POST'])
def ai_chat():
    data = request.json or {}
    message = data.get('message', '').strip().lower()
    
    responses = [
        "Juda yaxshi savol! Mars SPACE platformasida darslarni faol o'rganib borishingizni tavsiya qilaman. 🚀",
        "MarsCode masalalarini yechib borish orqali siz coins va energiya yig'ishingiz mumkin! 🪙⚡",
        "To'lov amaliyotini muvaffaqiyatli bajarish uchun 'Onlayn to'lov' sahifasiga o'ting.",
        "Space Shop do'konimizda ajoyib stikerlar va breloklar kutmoqda! Ularni zudlik bilan sotib olishingiz mumkin. 🛍",
        "Bugungi kunlik seriyangiz (Streak) saqlab qolish uchun har kuni platformaga kiring va vazifalarni bajaring! 🔥",
        "Eduverse bo'limidagi darsliklar sizga frontend va backend texnologiyalarini chuqur o'rganishda yordam beradi."
    ]
    
    if "salom" in message or "hello" in message:
        reply = "Salom! Men Mars SPACE AI yordamchisiman. Sizga qanday yordam bera olaman? 💫"
    elif "coin" in message or "tanga" in message:
        reply = "Mars tangalari (Coins) darslarda faol bo'lganingizda, blog yozganingizda va MarsCode masalalarini yechganingizda beriladi. Ularni Space Shop'da ajoyib sovg'alarga almashtirishingiz mumkin! 🪙"
    elif "kod" in message or "dastur" in message or "code" in message:
        reply = "MarsCode bo'limida dunyoning eng yirik kompaniyalari (Google, Amazon kabi) tanlovlarda beradigan masalalari mavjud. O'zingizni sinab ko'ring! 💻"
    elif "video" in message or "dars" in message or "kurs" in message:
        reply = "Mening Kurslarim yoki Eduverse sahifalaridan o'zingizga qiziq bo'lgan videodarslarni tanlang va o'rganishni boshlang! 📹"
    else:
        reply = random.choice(responses)
        
    return jsonify({
        "reply": reply
    })
