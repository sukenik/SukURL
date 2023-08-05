import json
from src.DataAccess.DataAccess import execute_query_with_params, execute_query

class UrlService:
	def convert_to_entity(row: tuple):
		db_object = {
			'tinyUrl': str(row[0]),
			'url': row[1]
		}

		parsed_object = json.dumps(db_object)
		return parsed_object

	def create(url_text: str, url: str):
		query = '''
			INSERT INTO public."URL"(
				"TINY_URL", "URL"
			)
			VALUES (%s, %s)
			RETURNING "TINY_URL";
		'''

		result = execute_query_with_params(query, [url_text, url], True)[0]

		return { 'tinyUrl': result[0] }

	def get_all():
		query = '''
			SELECT "TINY_URL", "URL"
			FROM public."URL";
		'''

		result = execute_query(query, True)

		parsed_urls = []

		for row in result:
			parsed_url = UrlService.convert_to_entity(row)
			parsed_urls.append(parsed_url)

		return parsed_urls
	
	def check_for_duplicate_tiny_url(tiny_url):
		query = '''
			SELECT COUNT("TINY_URL")
			FROM public."URL"
			WHERE "TINY_URL" = %s; 
		'''

		result = execute_query_with_params(query, [tiny_url], True)[0]
		return bool(result[0])

	def get_url_by_tiny(tiny_url):
		query = '''
			SELECT "URL"
			FROM public."URL"
			WHERE "TINY_URL" = %s; 
		'''

		result = execute_query_with_params(query, [tiny_url], True)

		if (result):
			first_row = result[0]
			return first_row[0]

		return []