from app import create_app, db
from app.models import User, Topic, Attendance

app = create_app()

with app.app_context():
    db.drop_all()
    db.create_all()
    
    admin = User.query.filter_by(email='admin123@gmail.com').first()
    if not admin:
        admin = User(username='Admin', email='admin123@gmail.com', role='admin')
        admin.set_password('admin123@')
        db.session.add(admin)
    
    teacher = User.query.filter_by(email='teacher123@gmail.com').first()
    if not teacher:
        teacher = User(username='Teacher 1', email='teacher123@gmail.com', role='teacher', salary=5000000.0)
        teacher.set_password('teacher123@')
        db.session.add(teacher)
        
    db.session.commit()
    print("Database initialized successfully.")
