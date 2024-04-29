from firebase_admin import firestore, initialize_app
from settings import PROJECT_ID, API_KEY, AUTH_DOMAIN, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID

initialize_app(options={
	'apiKey': API_KEY,
	'authDomain': AUTH_DOMAIN,
	'projectId': PROJECT_ID,
	'storageBucket': STORAGE_BUCKET,
	'messagingSenderId': MESSAGING_SENDER_ID,
	'appId': APP_ID
})

db = firestore.client()