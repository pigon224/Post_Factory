from sqlalchemy import Column, ForeignKey, Integer, String, Text, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship

SQLALCHEMY_DATABASE_URL = 'postgresql://postgres:pass123@localhost/postgres'

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo = True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
def init_db():
    # Create all tables in the database (if they don't exist)
    Base.metadata.create_all(bind=engine)



class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    title = Column(String, index=True)
    content = Column(String)
    rating =  Column(Integer, default=0)
    comments = relationship("Comment", back_populates="post")


class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True, index=True)
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"))
    username = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    post = relationship("Post", back_populates="comments")



def get_posts(db: Session):
    return db.query(Post).all()


def create_post(db: Session, title: str, content: str):
    new_post = Post(title=title, content=content)
    db.add(new_post)
    db.commit()
    db.refresh(new_post) 
    return new_post


def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()


def add_comment(db: Session, post_id: int, username: str, content: str):
    new_comment = Comment(post_id=post_id, username=username, content=content)
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment



def __repr__(self):
    return f'Note(id={self.id}, title={self.title}, note_body={self.note_body})'

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
    
    