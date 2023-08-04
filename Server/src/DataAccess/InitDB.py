from src.DataAccess.DataAccess import execute_query

def init_db():
	execute_query('''
		CREATE TABLE IF NOT EXISTS public."URL" (
			"ID" uuid DEFAULT uuid_generate_v4 (),
			"URL_TEXT" TEXT NOT NULL,
			"TINY_URL" TEXT NOT NULL,
			PRIMARY KEY("ID")
		);
	''')
