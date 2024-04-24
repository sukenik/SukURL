import axios from 'axios'
import { iUrl } from '../Utils'
import { appConfig } from '../AppConfig'

const MY_URLS_LIMIT_NUM = 5

const getMyUrls = async (userId: string, tinyUrl?: string): Promise<iUrl[]> => {
	const res = await axios.get(
		`${appConfig.serverUrl}/my-urls?user_id=${userId}&limit=${MY_URLS_LIMIT_NUM}&tiny_url=${tinyUrl}`
	)

	return res.data
}

export default getMyUrls