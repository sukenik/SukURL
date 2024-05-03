import axios from 'axios'
import { iUrl } from '../Utils'
import { appConfig } from '../appConfig'

const MY_URLS_LIMIT_NUM = 5

export interface iGetMyUrlsReturnType extends iUrl {
	visitsNum: number
}

const getMyUrls = async (userId: string, tinyUrl?: string): Promise<iGetMyUrlsReturnType[]> => {
	const res = await axios.get(
		`${appConfig.serverUrl}/my-urls?user_id=${userId}&limit=${MY_URLS_LIMIT_NUM}&tiny_url=${tinyUrl}`
	)

	return res.data
}

export default getMyUrls