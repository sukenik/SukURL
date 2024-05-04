from fastapi import FastAPI, responses, HTTPException, Request
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from hashlib import sha256
from src.schema.URLService import UrlService
from src.schema.VisitService import VisitService
from src.Middlewares import validate_tiny_url, validate_url
from src.Model import UrlEntity
from settings import ALLOWED_ORIGIN
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

app = FastAPI()

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

origins = ALLOWED_ORIGIN or '*'

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origins],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/my-urls')
@limiter.limit('5/minute')
def read_all(request: Request, user_id: str, limit: int, tiny_url: str):
    urls = UrlService.get_all_by_user_id(limit, tiny_url, user_id)

    urls_with_visits_num = []

    for url in urls:
        visits_num = VisitService.get_count_by_url(url['tinyUrl'])

        urls_with_visits_num.append({
            **url, **visits_num
        })

    return urls_with_visits_num

@app.get('/url/{tiny_url}')
@limiter.limit('5/minute')
def read_url(tiny_url: str, request: Request):
    url_result = UrlService.get_url_by_tiny(tiny_url)

    if url_result:
        VisitService.create(tiny_url, request.headers)

        return responses.RedirectResponse(url_result['url'])
    else:
        return HTTPException(status_code=404, detail='URL not found.')

@app.put('/')
@limiter.limit('5/minute')
def create_url(request: Request, variables: UrlEntity):
    validate_url(variables.url)

    doc_id = validate_tiny_url(variables.tiny_url)

    return UrlService.create(variables.url, variables.tiny_url, doc_id, variables.user_id)

@app.delete('/{tiny_url}')
@limiter.limit('5/minute')
def delete_url(request: Request, tiny_url: str):
    hashed_tiny_url = sha256(
        (f'{tiny_url}').encode()
    ).hexdigest()

    VisitService.delete_by_url(tiny_url)
    UrlService.delete(hashed_tiny_url)
