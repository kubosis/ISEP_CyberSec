from typing import Optional
from datetime import datetime

from sqlalchemy import Enum, String, Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column
import sqlalchemy
import enum

from app.backend.models.db.base import Base

class RoleEnum(enum.Enum):
    ADMIN = "admin"
    USER = "user"

class UserAccount(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement="auto")
    username: Mapped[str] = mapped_column(String(64), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(128), nullable=False, unique=True)
    role: Mapped[Enum] = mapped_column(
        Enum(RoleEnum, name="role_enum", native_enum=False),
        nullable=False,
        default=RoleEnum.USER
    )

    hashed_password: Mapped[Optional[str]] = mapped_column(String(1024), nullable=True)

    is_email_verified: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)

    created_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True, default=func.now())

    __mapper_args__ = {"eager_defaults": True}
