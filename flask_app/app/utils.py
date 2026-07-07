def init_session(session):
    if 'role' not in session:
        session['role'] = 'student'
    if 'wallet' not in session:
        session['wallet'] = 817500.25
    if 'streak' not in session:
        session['streak'] = 1
    if 'coins' not in session:
        session['coins'] = 148
    if 'energy' not in session:
        session['energy'] = 1170
    if 'subscription' not in session:
        session['subscription'] = False
    
    # Shop items default state
    if 'shop_items' not in session:
        session['shop_items'] = [
            {"id": "pen", "name": "Mars Pen", "price": 49, "stock": 0, "image": "pen.png"},
            {"id": "sticker", "name": "Keyboard Sticker", "price": 49, "stock": 4, "image": "sticker.png"},
            {"id": "strobar", "name": "Strobar", "price": 49, "stock": 63, "image": "strobar.png"},
            {"id": "notepad", "name": "Notepad", "price": 149, "stock": 5, "image": "notepad.png"},
            {"id": "rug", "name": "Mars Rug", "price": 149, "stock": 5, "image": "rug.png"},
            {"id": "keychain", "name": "Keychain", "price": 149, "stock": 15, "image": "keychain.png"},
            {"id": "stand", "name": "Phone Stand", "price": 199, "stock": 2, "image": "phone_stand.png"},
            {"id": "mug", "name": "Mug", "price": 199, "stock": 0, "image": "mug.png"}
        ]
        
    # Blog posts default state
    if 'blog_posts' not in session:
        session['blog_posts'] = [
            {
                "id": 1,
                "author": "Nurumbetov Mustafa",
                "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Mustafa",
                "time": "Bugun, 10:24",
                "image": "shaxsiy_rekord.png",
                "title": "Shaxsiy rekord: 15 SEC, 36 WPM, 100% ACC",
                "content": "Bugun MarsCode platformasida typing test bo'yicha yangi shaxsiy rekordimni o'rnatdim! 🚀 Harakat qilishdan to'xtamang!",
                "likes": 24,
                "liked": False,
                "comments": [
                    {"author": "Saidaxmatov Saidaziz", "text": "Dahshat natijada do'stim! Tabriklayman! 🔥"},
                    {"author": "Otabek", "text": "Qoyil, men ham yetib olaman yaqinda!"}
                ]
            }
        ]
