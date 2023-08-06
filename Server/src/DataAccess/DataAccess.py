import psycopg2
import psycopg2.extras

psycopg2.extras.register_uuid()

def db_connect():
	return psycopg2.connect(
		database='postgres',
		user='postgres',
		password='postgres',
		host='db',
		port='5432'
	)

def execute_query(query: str, hasResult = None):
	result = None

	connection = db_connect()
	cursor = connection.cursor()

	cursor.execute(query)

	if (bool(hasResult)):
		result = cursor.fetchall()

	connection.commit()
	connection.close()

	return result

def execute_query_with_params(query: str, params: list, hasResult = None):
	result = None

	connection = db_connect()
	cursor = connection.cursor()

	cursor.execute(query, params)

	if (bool(hasResult)):
		result = cursor.fetchall()

	connection.commit()
	connection.close()

	return result
