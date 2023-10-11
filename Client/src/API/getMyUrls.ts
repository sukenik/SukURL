import axios from 'axios'
import { MY_URLS_LIMIT_NUM, iUrl } from '../Utils'
import { SERVER_URL } from '..'

const getMyUrls = async (tinyUrl?: string): Promise<iUrl[]> => {
	return axios.get(
		`${SERVER_URL}/my-urls?limit=${MY_URLS_LIMIT_NUM}&tiny_url=${tinyUrl}`
	).then(res => res.data)
}

export default getMyUrls