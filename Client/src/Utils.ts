import { useAuth } from './Context/AuthContext'

export const isValidUrl = (urlString: string) => {
	try {
		return Boolean(new URL(urlString))
	}
	catch(e){ 
		return false
	}
}

export interface iUrl {
	tinyUrl: string
	url: string
}

export const APP_NAME = 'SukURL'


export const useCurrentUserId = () => {
	const { currentUser } = useAuth()

	return currentUser?.email || ''
}
