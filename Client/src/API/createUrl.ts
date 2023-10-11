import axios from 'axios'
import { endpoint } from '..'
import { iUrl } from '../Utils'

const createUrl = async (tinyUrl: string, url: string): Promise<iUrl> => {
	return axios.put(
		endpoint,
		{ tiny_url: tinyUrl, url }
	).then(res => res.data)
}

export default createUrl