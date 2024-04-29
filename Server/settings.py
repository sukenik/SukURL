import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

DB_NAME = os.environ.get('DB_NAME')
USER_NAME = os.environ.get('USER_NAME')
PASSWORD = os.environ.get('PASSWORD')
HOST = os.environ.get('HOST')
PORT = os.environ.get('PORT')

PROJECT_ID = os.environ.get('PROJECT_ID')
API_KEY = os.environ.get('API_KEY')
AUTH_DOMAIN = os.environ.get('AUTH_DOMAIN')
STORAGE_BUCKET = os.environ.get('STORAGE_BUCKET')
MESSAGING_SENDER_ID = os.environ.get('MESSAGING_SENDER_ID')
APP_ID = os.environ.get('APP_ID')