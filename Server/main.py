from fastapi import FastAPI, responses
from dotenv import load_dotenv
from src.DataAccess.InitDB import init_db
from src.schema.URLService import URLService
from src.Middlewares import validate_tiny_url

load_dotenv()
init_db()

app = FastAPI()

@app.get('/')
def read_all():
    return URLService.get_all()

@app.put('/')
def create_url(url_text: str, tiny_url: str):
    validate_tiny_url(tiny_url)

    return URLService.create(url_text, tiny_url)

@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    file_path = 'favicon.ico'

    return responses.FileResponse(file_path)