from fastapi import HTTPException
from urllib.parse import urlparse
from src.schema.UrlService import UrlService

def validate_tiny_url(tiny_url: str, req_url: str):
    if (len(tiny_url) < 5):
        raise HTTPException(status_code=400, detail='The Alias must be at least 5 characters.')
    elif (not tiny_url.isalnum()):
        raise HTTPException(status_code=400, detail='The Alias format is invalid.')

    is_duplicate = UrlService.check_for_duplicate_tiny_url(req_url + tiny_url)

    if (is_duplicate):
        raise HTTPException(status_code=400, detail='Alias is not available.')

def validate_url(url: str):
    try:
        result = urlparse(url)
        is_ok = all([result.scheme, result.netloc])

        if (not is_ok):
            raise HTTPException(status_code=400, detail='Invalid URL.')
    except ValueError:
        raise HTTPException(status_code=400, detail='Invalid URL.')