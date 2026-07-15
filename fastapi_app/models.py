from sqlalchemy import Column, Integer, String, Float, DateTime, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from passlib.context import CryptContext
from .database import Base

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(64), index=True, nullable=False)
    email = Column(String(120), index=True, unique=True, nullable=True)
    password_hash = Column(String(128), nullable=True)
    role = Column(String(20), default='student')
    salary = Column(Float, default=0.0)
    wallet = Column(Float, default=0.0)
    coins = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    attendance_records = relationship("Attendance", back_populates="user")
    posts = relationship("Post", back_populates="author")

    def set_password(self, password: str):
        self.password_hash = pwd_context.hash(password)

    def check_password(self, password: str):
        if not self.password_hash:
            return False
        return pwd_context.verify(password, self.password_hash)

class Topic(Base):
    __tablename__ = "topic"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(140), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'))
    status = Column(String(20), default='present')

    user = relationship("User", back_populates="attendance_records")

class Post(Base):
    __tablename__ = "post"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(140))
    content = Column(Text)
    timestamp = Column(DateTime, index=True, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey('user.id'))

    author = relationship("User", back_populates="posts")
