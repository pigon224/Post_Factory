from typing import List
from fastapi import Depends, FastAPI, HTTPException
import psycopg2
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.app.database import Comment, Post, get_db, init_db

app = FastAPI()

class PostCreate(BaseModel):
    title: str
    content: str

class CommentCreate(BaseModel):
    post_id: int
    username: str
    content: str

class PostRating(BaseModel):
    rating: int

class Config:
    orm_mode = True

# Creates the needed table (if not already exist)
init_db()


@app.get("/posts")
def pshow_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()



@app.post("/posts")
def create_post (post: PostCreate, db: Session = Depends(get_db)):
    db_post = Post(title=post.title, content=post.content)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)  # Retrieve the updated post with its ID
    return db_post
                    
@app.put("/posts/{post_id}/rate")
def rate_post(post_id: int, post_rating: PostRating, db: Session = Depends(get_db)):
    db_post = db.query(Post).filter(Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    db_post.rating = post_rating.rating
    db.commit()
    db.refresh(db_post)
    return db_post
    
@app.delete("/posts/{post_id}", status_code=204)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    # Gets the post by the ID 
    post = db.query(Post).filter(Post.id == post_id).first()

    # Raise an error if the post does not exist
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    # Delete the post
    db.delete(post)
    db.commit()
    
    return {"message": "Post deleted successfully"}



@app.post("/posts/{post_id}/comments", status_code=201)
def create_comment(post_id: int, content: str, username: str, db: Session = Depends(get_db)):
    post = db.query(Post).filter(Post.id == post_id).first()

    # Checks if the post
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    comment = Comment(post_id=post_id, content=content, username=username)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment
from fastapi.middleware.cors import CORSMiddleware

# Add CORS middleware to allow requests from your frontend's origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows all origins, but you may want to restrict it to your frontend's URL, like ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
