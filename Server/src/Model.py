from pydantic import BaseModel
from uuid import UUID

class URLEntity(BaseModel):
    id: UUID
    urlText: str
    tinyUrl: str
