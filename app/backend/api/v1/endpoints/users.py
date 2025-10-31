import fastapi

from app.backend.api.v1.deps import get_repository
from app.backend.models.schema.users import *
from app.backend.repository.users import UserCRUDRepository

router = fastapi.APIRouter(tags=["users"])


@router.post("/", response_model=UserInResponse, status_code=fastapi.status.HTTP_201_CREATED)
async def create_user(
    user: UserInCreate,
    account_repo: UserCRUDRepository = fastapi.Depends(get_repository(repo_type=UserCRUDRepository)),
):
    db_user = await account_repo.create_account(user)
    return UserInResponse(id=db_user.id, authorized_account=None)  # Adjust as needed


@router.get("/", response_model=list[UserInResponse], status_code=fastapi.status.HTTP_200_OK)
async def get_users(
    account_repo: UserCRUDRepository = fastapi.Depends(get_repository(repo_type=UserCRUDRepository)),
):
    db_users = await account_repo.read_accounts()
    return [UserInResponse(id=u.id, authorized_account=None) for u in db_users]  # Adjust as needed


@router.get("/{user_id}", response_model=UserInResponse, status_code=fastapi.status.HTTP_200_OK)
async def get_user_by_id(
    user_id: int,
    account_repo: UserCRUDRepository = fastapi.Depends(get_repository(repo_type=UserCRUDRepository)),
):
    db_user = await account_repo.read_account_by_id(user_id)
    return UserInResponse(id=db_user.id, authorized_account=None)  # Adjust as needed


@router.put("/{user_id}", response_model=UserInResponse, status_code=fastapi.status.HTTP_200_OK)
async def update_user(
    user_id: int,
    user_update: UserInUpdate,
    account_repo: UserCRUDRepository = fastapi.Depends(get_repository(repo_type=UserCRUDRepository)),
):
    db_user = await account_repo.update_account_by_id(user_id, user_update)
    return UserInResponse(id=db_user.id, authorized_account=None)  # Adjust as needed


@router.delete("/{user_id}", response_model=dict, status_code=fastapi.status.HTTP_200_OK)
async def delete_user(
    user_id: int,
    account_repo: UserCRUDRepository = fastapi.Depends(get_repository(repo_type=UserCRUDRepository)),
):
    msg = await account_repo.delete_account_by_id(user_id)
    return {"message": msg}
