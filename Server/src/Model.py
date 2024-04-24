from pydantic import BaseModel

class UrlEntity(BaseModel):
    tiny_url: str
    url: str
    user_id: str