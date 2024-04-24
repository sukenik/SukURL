from google.cloud.firestore_v1.base_query import FieldFilter
from src.DataAccess.Firestore import db
from src.Model import UrlEntity

COLLECTION_NAME = 'URL'

class UrlService:
	def convert_to_entity(url: str, tiny_url: str, user_id: str) -> UrlEntity:
		db_object = {
			'tinyUrl': tiny_url,
			'url': url,
			'userId': user_id,
		}

		return db_object

	def create(url: str, tiny_url: str, doc_id: str, user_id: str) -> UrlEntity:
		parsed_url = UrlService.convert_to_entity(url, tiny_url, user_id)

		db.collection(COLLECTION_NAME).document(doc_id).set(parsed_url)

		return parsed_url

	def get_all_by_user_id(limit: int, tiny_url: str, user_id: str) -> list[UrlEntity]:
		result = []
		query = None
		urls_ref = db.collection(COLLECTION_NAME)

		if tiny_url == 'undefined':
			query = (
				urls_ref
					.where(filter=FieldFilter('userId', '==', user_id))
					.order_by('tinyUrl')
					.limit(limit)
					.stream()
			)
		else:
			query = (
				urls_ref
					.where(filter=FieldFilter('userId', '==', user_id))
					.order_by('tinyUrl')
					.start_after({ 'tinyUrl': tiny_url })
					.limit(limit)
					.stream()
			)

		for doc in query:
			result.append(doc.to_dict())

		return result

	def check_for_duplicate_tiny_url(
		tiny_url: str,
		hashed_tiny_url: str
	) -> (bool | None):
		doc_ref = (
			db.collection(COLLECTION_NAME)
				.document(hashed_tiny_url)
				.get()
		)

		if doc_ref.exists:
			doc = doc_ref.to_dict()

			if doc['tinyUrl'] == tiny_url:
				return True
			else:
				return None

		return False

	def get_url_by_tiny(tiny_url: str) -> UrlEntity:
		doc = (
			db.collection(COLLECTION_NAME)
				.where(filter=FieldFilter('tinyUrl', '==', tiny_url))
				.get()
		)[0]
		url = doc.to_dict()

		return url

	def delete(doc_id: str):
		db.collection(COLLECTION_NAME).document(doc_id).delete()