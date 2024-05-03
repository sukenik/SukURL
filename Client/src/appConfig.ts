export const appConfig = {
	serverUrl: process.env.SERVER_URL || 'http://localhost:8000',
	isDevEnv: process.env.NODE_ENV === 'development'
}