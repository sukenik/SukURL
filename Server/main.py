from fastapi import FastAPI, responses, HTTPException, Request
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from hashlib import sha256
from src.schema.URLService import UrlService
from src.schema.VisitService import VisitService
from src.Middlewares import validate_tiny_url, validate_url
from src.Model import UrlEntity

load_dotenv()

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/my-urls')
def read_all(user_id: str, limit: int, tiny_url: str):
    urls_with_visits_num = []

    urls = UrlService.get_all_by_user_id(limit, tiny_url, user_id)

    for url in urls:
        visits_num = VisitService.get_count_by_url(url['tinyUrl'])

        urls_with_visits_num.append({
            **url, **visits_num
        })

    return urls_with_visits_num

@app.get('/url/{tiny_url}')
def read_url(tiny_url: str, request: Request):
    url_result = UrlService.get_url_by_tiny(tiny_url)

    if url_result:
        VisitService.create(tiny_url, request.headers)

        return responses.RedirectResponse(url_result['url'])
    else:
        return HTTPException(status_code=404, detail='URL not found.')

@app.put('/')
def create_url(variables: UrlEntity):
    validate_url(variables.url)

    doc_id = validate_tiny_url(variables.tiny_url)

    return UrlService.create(variables.url, variables.tiny_url, doc_id, variables.user_id)

@app.delete('/{tiny_url}')
def delete_url(tiny_url: str):
    hashed_tiny_url = sha256(
        (f'{tiny_url}').encode()
    ).hexdigest()

    VisitService.delete_by_url(tiny_url)
    UrlService.delete(hashed_tiny_url)

@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    file_path = 'favicon.ico'

    return responses.FileResponse(file_path)