import axios from 'axios'
import { MY_URLS_LIMIT_NUM, iUrl } from '../Utils'
import { SERVER_URL } from '../appConfig'

const getMyUrls = async (tinyUrl?: string): Promise<iUrl[]> => {
	const res = await axios.get(
		`${SERVER_URL}/my-urls?limit=${MY_URLS_LIMIT_NUM}&tiny_url=${tinyUrl}`
	)

	return res.data
}

export default getMyUrls