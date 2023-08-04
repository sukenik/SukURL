import json
from src.DataAccess.DataAccess import execute_query_with_params, execute_query

class URL:
	def convert_to_entity(row: tuple):
		db_object = {
			"id": str(row[0]),
			"urlText": row[1],
			"tinyUrl": str(row[2])
		}

		parsed_object = json.dumps(db_object)
		return parsed_object

	def create(url_text: str, tiny_url: str):
		query = '''
			INSERT INTO public."URL"(
				"URL_TEXT", "TINY_URL"
			)
			VALUES (%s, %s)
			RETURNING "TINY_URL";
		'''

		result = execute_query_with_params(query, [url_text, tiny_url], True)[0]

		return { 'tinyUrl': result[0] }

	def get_all():
		query = '''
			SELECT "ID", "URL_TEXT", "TINY_URL" 
			FROM public."URL";
		'''

		result = execute_query(query, True)

		parsed_urls = []

		for row in result:
			parsed_url = URL.convert_to_entity(row)
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
