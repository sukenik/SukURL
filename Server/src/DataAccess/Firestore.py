import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from settings import PROJECT_ID

cred = credentials.ApplicationDefault()

firebase_admin.initialize_app(cred, { 'projectId': PROJECT_ID })
db = firestore.client()