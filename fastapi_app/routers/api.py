from fastapi import APIRouter, Depends, HTTPException, status, Body
from sqlalchemy.orm import Session
from .. import database, models, schemas, auth
import random
from typing import List, Dict

router = APIRouter()

@router.post("/role")
def switch_role(role: str = Body(..., embed=True), db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if role not in ('student', 'teacher', 'admin'):
        raise HTTPException(status_code=400, detail="Noto'g'ri rol!")
    # Note: switching role per session doesn't easily translate to stateless JWT.
    # We can either update the user's role in DB or generate a new JWT token.
    # For simplicity, we assume this is changing the role in the DB to test the platform.
    current_user.role = role
    db.commit()
    return {"success": True, "role": role}

@router.post("/admin/add_user")
def add_user(user: schemas.UserCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="Ruxsat yo'q")
    
    if db.query(models.User).filter(models.User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Elektron pochta band!")

    new_user = models.User(
        username=user.username, 
        email=user.email, 
        role=user.role, 
        salary=user.salary
    )
    if user.password:
        new_user.set_password(user.password)
        
    db.add(new_user)
    db.commit()
    return {"success": True}

@router.post("/admin/update_salary")
def update_salary(user_id: int = Body(...), salary: float = Body(...), db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="Ruxsat yo'q")
    
    user = db.query(models.User).filter(models.User.id == user_id, models.User.role == 'teacher').first()
    if user:
        user.salary = salary
        db.commit()
        return {"success": True}
    raise HTTPException(status_code=404, detail="O'qituvchi topilmadi!")

@router.post("/admin/add_coins_to_teacher")
def add_coins_to_teacher(teacher_id: int = Body(...), coins: int = Body(...), db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="Ruxsat yo'q")
        
    teacher = db.query(models.User).filter(models.User.id == teacher_id, models.User.role == 'teacher').first()
    if teacher:
        teacher.coins += coins
        db.commit()
        return {"success": True, "new_balance": teacher.coins}
    raise HTTPException(status_code=404, detail="O'qituvchi topilmadi!")

@router.post("/teacher/assign_coins")
def assign_coins(student_id: int = Body(...), coins: int = Body(...), db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.role != 'teacher':
        raise HTTPException(status_code=403, detail="Ruxsat yo'q")
    
    student = db.query(models.User).filter(models.User.id == student_id, models.User.role == 'student').first()
    if not student:
        raise HTTPException(status_code=404, detail="O'quvchi topilmadi!")
        
    if current_user.coins < coins:
        raise HTTPException(status_code=400, detail=f"Yetarli coin yo'q! Sizda faqat {current_user.coins} coin bor.")
        
    current_user.coins -= coins
    student.coins += coins
    db.commit()
    return {"success": True, "teacher_remaining": current_user.coins, "student_coins": student.coins}
    
@router.post("/chat")
def ai_chat(message: str = Body(..., embed=True), current_user: models.User = Depends(auth.get_current_user)):
    msg = message.strip().lower()
    responses = [
        "Juda yaxshi savol! Mars SPACE platformasida darslarni faol o'rganib borishingizni tavsiya qilaman. 🚀",
        "MarsCode masalalarini yechib borish orqali siz coins va energiya yig'ishingiz mumkin! 🪙⚡",
        "To'lov amaliyotini muvaffaqiyatli bajarish uchun 'Onlayn to'lov' sahifasiga o'ting.",
        "Space Shop do'konimizda ajoyib stikerlar va breloklar kutmoqda! Ularni zudlik bilan sotib olishingiz mumkin. 🛍"
    ]
    if "salom" in msg or "hello" in msg:
        reply = "Salom! Men Mars SPACE AI yordamchisiman. Sizga qanday yordam bera olaman? 💫"
    elif "coin" in msg or "tanga" in msg:
        reply = "Mars tangalari (Coins) darslarda faol bo'lganingizda va hokazo beriladi... 🪙"
    else:
        reply = random.choice(responses)
    return {"reply": reply}
