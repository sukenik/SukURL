from fastapi import FastAPI, HTTPException, responses
from src.DataAccess.InitDB import init_db
from src.schema.URLService import URLService
from dotenv import load_dotenv

load_dotenv()
init_db()

app = FastAPI()

@app.get('/')
def read_all():
    return URLService.get_all()

@app.put('/')
def create_url(url_text: str, tiny_url: str):
    if (len(tiny_url) < 5):
        raise HTTPException(status_code=400, detail='The Alias must be at least 5 characters.')
        
    is_duplicate = URLService.check_for_duplicate_tiny_url(tiny_url)

    if (is_duplicate):
        raise HTTPException(status_code=400, detail='Alias is not available.')

    return URLService.create(url_text, tiny_url)

@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    file_path = 'favicon.ico'

    return responses.FileResponse(file_path)