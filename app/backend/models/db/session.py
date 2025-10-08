from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.backend.config.settings import get_settings

settings = get_settings()

engine = create_engine(settings.SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
