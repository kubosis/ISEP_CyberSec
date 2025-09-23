from typing import Optional
from datetime import datetime

from sqlalchemy import Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
import sqlalchemy

from app.backend.models.db.base import Base

class UserAccount(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement="auto")
    username: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)

    hashed_password: Mapped[Optional[str]] = mapped_column(String(1024), nullable=True)
    hashed_salt: Mapped[Optional[str]] = mapped_column(String(1024), nullable=True)

    is_email_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True, default=func.now())

    __mapper_args__ = {"eager_defaults": True}
