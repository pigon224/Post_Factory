# /app/crud.py

from sqlalchemy.orm import Session

from backend.app.schemas import UserCreate
from . import models
from passlib.context import CryptContext

# Create a new user
def create_user(db: Session, user: UserCreate, hashed_password: str):
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Check if user exists
def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()
