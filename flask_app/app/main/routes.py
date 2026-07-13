from flask import render_template, session, request, redirect, url_for, flash
from functools import wraps
from app.main import bp
from app.utils import init_session
from app.models import User, Topic, Attendance

def role_required(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session or session.get('role') != role:
                flash("Sizda bu sahifaga kirish huquqi yo'q!", "error")
                if 'user_id' not in session:
                    return redirect(url_for('main.login'))
                return redirect(url_for('main.index'))
            return f(*args, **kwargs)
        return decorated_function
    return decorator

@bp.route('/')
@bp.route('/index')
def index():
    if 'user_id' not in session:
        return redirect(url_for('main.login'))
        
    init_session(session)
    return render_template('index.html')

@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            session.clear()
            session['user_id'] = user.id
            session['role'] = user.role
            init_session(session)
            if user.role == 'admin':
                return redirect(url_for('main.admin_dashboard'))
            elif user.role == 'teacher':
                return redirect(url_for('main.teacher_dashboard'))
            return redirect(url_for('main.index'))
        else:
            flash("Noto'g'ri elektron pochta yoki parol!", "error")
            
    return render_template('login.html')

@bp.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    password = request.form.get('password')
    username = request.form.get('username')
    
    if not email or not password or not username:
        flash("Barcha maydonlarni to'ldiring!", "error")
        return redirect(url_for('main.login'))
        
    from app import db
    if User.query.filter_by(email=email).first():
        flash("Email allaqachon mavjud!", "error")
        return redirect(url_for('main.login'))
        
    user = User(username=username, email=email, role='student')
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    
    flash("Muvaffaqiyatli ro'yhatdan o'tdingiz. Tizimga kiring.", "success")
    return redirect(url_for('main.login'))

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('main.login'))

@bp.route('/typing')
def typing_test():
    # If standard user visits, render typing.html
    init_session(session)
    return render_template('typing.html')

@bp.route('/admin_dashboard')
@role_required('admin')
def admin_dashboard():
    teachers = User.query.filter_by(role='teacher').all()
    students = User.query.filter_by(role='student').all()
    admins = User.query.filter_by(role='admin').all()
    return render_template('admin.html', teachers=teachers, students=students, admins=admins)

@bp.route('/teacher_dashboard')
@role_required('teacher')
def teacher_dashboard():
    students = User.query.filter_by(role='student').all()
    topics = Topic.query.all()
    return render_template('teacher.html', students=students, topics=topics)
