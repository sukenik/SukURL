from src.DataAccess.DataAccess import execute_query

def init_db():
	execute_query('''
		CREATE TABLE IF NOT EXISTS public."URL" (
			"TINY_URL" TEXT NOT NULL,
			"URL" TEXT NOT NULL,
			PRIMARY KEY("TINY_URL")
		);
	''')
