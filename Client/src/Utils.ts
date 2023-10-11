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

export const MY_URLS_LIMIT_NUM = 5