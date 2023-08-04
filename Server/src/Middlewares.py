from fastapi import HTTPException
from src.schema.URLService import URLService

def validate_tiny_url(tiny_url: str):
    if (len(tiny_url) < 5):
        raise HTTPException(status_code=400, detail='The Alias must be at least 5 characters.')
    elif (not tiny_url.isalnum()):
        raise HTTPException(status_code=400, detail='The Alias format is invalid.')

    is_duplicate = URLService.check_for_duplicate_tiny_url(tiny_url)

    if (is_duplicate):
        raise HTTPException(status_code=400, detail='Alias is not available.')