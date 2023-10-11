import axios from 'axios'
import { SERVER_URL } from '..'
import { iUrl } from '../Utils'

const createUrl = async (tinyUrl: string, url: string): Promise<iUrl> => {
	return axios.put(
		SERVER_URL,
		{ tiny_url: tinyUrl, url }
	).then(res => res.data)
}

export default createUrl