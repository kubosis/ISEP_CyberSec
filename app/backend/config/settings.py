import logging
from pathlib import Path
import json
import yaml

import decouple
import pydantic_settings
from charset_normalizer.md import lru_cache

ROOT_DIR: Path = Path(__file__).parent.parent.resolve()

backend_settings = None

class BackendBaseSettings(pydantic_settings.BaseSettings):
    TITLE: str = "ISEP CTF BACKEND"
    VERSION: str = "0.0.1"
    TIMEZONE: str = "CET"
    DESCRIPTION: str | None = "Backend API for ISEP CTF WEBPROJECT"
    ENV: str = decouple.config("ENV", default="dev", cast=str)  # type: ignore
    DEBUG: bool = ENV == "dev"


    # Server settings
    SERVER_HOST: str = decouple.config("SERVER_HOST", cast=str)  # type: ignore
    SERVER_PORT: int = decouple.config("SERVER_PORT", cast=int)  # type: ignore

    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000", # reactJS
        "http://0.0.0.0:3000",
    ]

    ALLOWED_METHODS: list[str] = ["*"]
    ALLOWED_HEADERS: list[str] = ["*"]

    LOGGING_LEVEL: int = logging.INFO
    LOGGERS: tuple[str, str] = ("uvicorn.asgi", "uvicorn.access")


    @property
    def backend_app_attributes(self) -> dict[str, str | bool | None]:
        """
        Set all `FastAPI` class' attributes with the custom values defined in `BackendBaseSettings`.
        """
        return {
            "title": self.TITLE,
            "version": self.VERSION,
            "debug": self.DEBUG,
            "description": self.DESCRIPTION,
        }


@lru_cache
def get_settings() -> BackendBaseSettings:
    global backend_settings
    if not backend_settings:
        backend_settings = BackendBaseSettings()
    return backend_settings
