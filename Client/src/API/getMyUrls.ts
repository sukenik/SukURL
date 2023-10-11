import axios from 'axios'
import { MY_URLS_LIMIT_NUM, iUrl } from '../Utils'
import { endpoint } from '..'

const getMyUrls = async (tinyUrl?: string): Promise<iUrl[]> => {
	return axios.get(
		`${endpoint}/my-urls?limit=${MY_URLS_LIMIT_NUM}&tiny_url=${tinyUrl}`
	).then(res => res.data)
}

export default getMyUrls