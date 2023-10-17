from fastapi import FastAPI, responses, HTTPException
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from hashlib import sha256
from src.schema.URLService import UrlService
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
def read_all(limit: int, tiny_url: str):
    return UrlService.get_all(limit, tiny_url)

@app.get('/url/{tiny_url}')
def read_url(tiny_url: str):
    url_result = UrlService.get_url_by_tiny(tiny_url)

    if url_result:
        return responses.RedirectResponse(url_result['url'])
    else:
        return HTTPException(status_code=404, detail='URL not found.')

@app.put('/')
def create_url(variables: UrlEntity):
    validate_url(variables.url)

    hashed_tiny_url = sha256(
        (f'{variables.tiny_url}').encode()
    ).hexdigest()

    new_hashed_value = validate_tiny_url(
        variables.tiny_url,
        hashed_tiny_url
    )

    doc_id = new_hashed_value or hashed_tiny_url

    return UrlService.create(variables.url, variables.tiny_url, doc_id)

@app.delete('/{tiny_url}')
def delete_url(tiny_url: str):
    hashed_tiny_url = sha256(
        (f'{tiny_url}').encode()
    ).hexdigest()

    return UrlService.delete(hashed_tiny_url)

@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    file_path = 'favicon.ico'

    return responses.FileResponse(file_path)