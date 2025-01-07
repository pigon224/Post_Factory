from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = "postgresql://postgres:pass123@localhost/postgres"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created successfully.")
def init_models():
    from models import User  # Import User model
    from models import Post  # Import Post model
    from models import Rating 
    Base.metadata.create_all(bind=engine)