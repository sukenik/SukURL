from os import path, environ
import sys
from dotenv import load_dotenv

DEV_ENV_FILE_PATH = 'dev.env'
isDevEnv = DEV_ENV_FILE_PATH in sys.argv

envFilePath = DEV_ENV_FILE_PATH if isDevEnv else 'prod.env'

dotenv_path = path.join(
	path.dirname(__file__),
	envFilePath
)

load_dotenv(dotenv_path)

DB_NAME = environ.get('DB_NAME')
USER_NAME = environ.get('USER_NAME')
PASSWORD = environ.get('PASSWORD')
HOST = environ.get('HOST')
PORT = environ.get('PORT')

PROJECT_ID = environ.get('PROJECT_ID')
PRIVATE_KEY_ID = environ.get('PRIVATE_KEY_ID')
PRIVATE_KEY = environ.get('PRIVATE_KEY')
CLIENT_EMAIL = environ.get('CLIENT_EMAIL')
CLIENT_ID = environ.get('CLIENT_ID')
AUTH_URI = environ.get('AUTH_URI')
TOKEN_URI = environ.get('TOKEN_URI')
AUTH_PROVIDER_CERT_URL = environ.get('AUTH_PROVIDER_CERT_URL')
CLIENT_CERT_URL = environ.get('CLIENT_CERT_URL')
ALLOWED_ORIGIN = environ.get('ALLOWED_ORIGIN')