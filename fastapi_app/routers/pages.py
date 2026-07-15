from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import database, models, auth

router = APIRouter()

@router.get("/admin")
def get_admin_dashboard(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="Access denied")
    
    teachers = db.query(models.User).filter(models.User.role == 'teacher').all()
    students = db.query(models.User).filter(models.User.role == 'student').all()
    admins = db.query(models.User).filter(models.User.role == 'admin').all()
    
    return {
        "teachers": [{"id": t.id, "username": t.username, "email": t.email, "salary": t.salary, "coins": t.coins} for t in teachers],
        "students": [{"id": s.id, "username": s.username, "email": s.email, "coins": s.coins} for s in students],
        "admins": [{"id": a.id, "username": a.username, "email": a.email} for a in admins]
    }

@router.get("/teacher")
def get_teacher_dashboard(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != 'teacher':
        raise HTTPException(status_code=403, detail="Access denied")
        
    students = db.query(models.User).filter(models.User.role == 'student').all()
    topics = db.query(models.Topic).all()
    
    return {
        "teacher": {
            "id": current_user.id,
            "username": current_user.username,
            "coins": current_user.coins
        },
        "students": [{"id": s.id, "username": s.username, "coins": s.coins} for s in students],
        "topics": [{"id": t.id, "name": t.name} for t in topics]
    }

@router.get("/student")
def get_student_dashboard(db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="Access denied")
        
    # Example student stats
    return {
        "username": current_user.username,
        "wallet": current_user.wallet,
        "coins": current_user.coins,
        "role": current_user.role
    }
