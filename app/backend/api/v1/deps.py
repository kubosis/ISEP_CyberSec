from collections.abc import Callable, Generator
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel, ValidationError
from sqlalchemy.orm import Session

from app.backend.config.settings import get_settings
from app.backend.models.db.session import engine
from app.backend.models.db.users import UserAccount

settings = get_settings()


reusable_oauth2 = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/login/access-token")


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(reusable_oauth2)]


class TokenPayload(BaseModel):
    sub: int
    exp: int | None = None


def get_current_user(session: SessionDep, token: TokenDep) -> UserAccount:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        token_data = TokenPayload(**payload)
    except ValidationError:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        ) from None
    user = session.get(UserAccount, token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    # Assuming is_active and is_superuser are attributes of UserAccount
    if hasattr(user, "is_active") and not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user


CurrentUser = Annotated[UserAccount, Depends(get_current_user)]


def get_current_active_superuser(current_user: CurrentUser) -> UserAccount:
    if hasattr(current_user, "is_superuser") and not current_user.is_superuser:
        raise HTTPException(status_code=403, detail="The user doesn't have enough privileges")
    return current_user


def get_repository(repo_type) -> Callable:
    def _get_repo(session: SessionDep):
        # PasswordManager is required for UserCRUDRepository
        if repo_type.__name__ == "UserCRUDRepository":
            from app.backend.security.password import PasswordManager

            return repo_type(session, PasswordManager())
        return repo_type(session)

    return _get_repo
