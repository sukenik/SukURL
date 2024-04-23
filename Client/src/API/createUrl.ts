import axios from 'axios'
import { iUrl } from '../Utils'
import { SERVER_URL } from '../AppConfig'

const createUrl = async (tinyUrl: string, url: string): Promise<iUrl> => {
	const res = await axios.put(
		SERVER_URL,
		{ tiny_url: tinyUrl, url }
	)

	return res.data
}

export default createUrl