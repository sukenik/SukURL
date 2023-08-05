from pydantic import BaseModel

class UrlEntity(BaseModel):
    tinyUrl: str
    url: str