from src.DataAccess.Firestore import db
from hashlib import sha256
from src.Model import VisitEntity
from google.cloud.firestore_v1.base_query import FieldFilter

COLLECTION_NAME = 'Visit'

class VisitService:
	def convert_to_entity(fingerprint: str, tiny_url: str) -> VisitEntity:
		db_object = {
			'fingerprint': fingerprint,
			'tinyUrl': tiny_url
		}

		return db_object

	def check_for_duplicate_visit(visit_id: str, fingerprint: str) -> str:
		doc_ref = (
			db.collection(COLLECTION_NAME)
				.document(visit_id)
				.get()
		)

		if doc_ref.exists:
			doc = doc_ref.to_dict()

			if doc['fingerprint'] == fingerprint:
				return True
			else:
				return None
		
		return False

	def create(tiny_url: str, request_headers: str):
		FINGERPRINT_HEADERS = ['user-agent', 'accept', 'accept-encoding', 'accept-language']
		headers_content = ''

		for header in request_headers:
			if header in FINGERPRINT_HEADERS:
				headers_content += request_headers.get(header)

		fingerprint = sha256(
			(f'{headers_content}').encode()
		).hexdigest()

		visit_id = sha256(
			(f'{fingerprint}{tiny_url}').encode()
		).hexdigest()

		is_duplicate = VisitService.check_for_duplicate_visit(visit_id, fingerprint)

		if is_duplicate:
			return
		elif is_duplicate == None:
			visit_id = sha256(visit_id).hexdigest()

		parsed_visit = VisitService.convert_to_entity(fingerprint, tiny_url)

		db.collection(COLLECTION_NAME).document(visit_id).set(parsed_visit)

	def get_count_by_url(tiny_url: str):
		visits_num = 0

		query = (
			db.collection(COLLECTION_NAME)
				.where(filter=FieldFilter('tinyUrl', '==', tiny_url))
				.stream()
		)

		for _ in query:
			visits_num += 1

		return { 'visitsNum': visits_num }

	def delete_by_url(tiny_url: str):
		batch = db.batch()

		doc_ref = (
			db.collection(COLLECTION_NAME)
				.where(filter=FieldFilter('tinyUrl', '==', tiny_url))
				.stream()
		)

		for doc in doc_ref:
			batch.delete(doc.reference)

		batch.commit()