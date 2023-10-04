from fastapi import FastAPI, responses, HTTPException
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from starlette.requests import Request
import redis
from src.DataAccess.InitDB import init_db
from src.schema.URLService import UrlService
from src.Middlewares import validate_tiny_url, validate_url
from src.Model import UrlEntity

load_dotenv()
init_db()

app = FastAPI()
rd = redis.Redis(
    'localhost',
    port=6379,
    db=0,
    charset='utf-8',
    decode_responses=True
)

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/my-urls')
def read_all(limit: int, offset: int):
    return UrlService.get_all(limit, offset)

@app.get('/url/{tiny_url}')
def read_url(req: Request):
    cache = rd.get(f'{req.url}')

    if cache:
        return responses.RedirectResponse(cache)

    url_row = UrlService.get_url_by_tiny(f'{req.url}')

    if (url_row):
        rd.set(f'{req.url}', url_row)

        return responses.RedirectResponse(url_row)
    else:
        return HTTPException(status_code=404, detail='URL not found.')

@app.put('/')
def create_url(variables: UrlEntity, req: Request):
    validate_url(variables.url)
    validate_tiny_url(variables.tiny_url, '{0}{1}'.format(req.url, 'url/'))

    return UrlService.create(
        '{0}url/{1}'.format(req.url, variables.tiny_url),
        variables.url
    )

@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    file_path = 'favicon.ico'

    return responses.FileResponse(file_path)