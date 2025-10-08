import fastapi
from fastapi.middleware import cors
import uvicorn

from app.backend.api.v1.router import api_router
from app.backend.config.settings import get_settings, BackendBaseSettings



def _create_fastapi_backend(app_settings: BackendBaseSettings) -> fastapi.FastAPI:
    backend_app = fastapi.FastAPI(**app_settings.backend_app_attributes)

    backend_app.add_middleware(
        cors.CORSMiddleware, # type: ignore
        allow_origins=app_settings.ALLOWED_ORIGINS,
        allow_credentials=app_settings.IS_ALLOWED_CREDENTIALS,
        allow_methods=app_settings.ALLOWED_METHODS,
        allow_headers=app_settings.ALLOWED_HEADERS,
    )

    backend_app.include_router(api_router, prefix=app_settings.API_PREFIX)
    return backend_app

if __name__ == '__main__':
    settings = get_settings()
    app = _create_fastapi_backend(settings)

    # bind to asgi
    uvicorn.run(
        "main:app",
        host=settings.SERVER_HOST,
        port=settings.SERVER_PORT,
        reload=settings.DEBUG,
        workers=settings.SERVER_WORKERS,
        log_level=settings.LOGGING_LEVEL,
    )

