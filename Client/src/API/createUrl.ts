import axios from 'axios'
import { iUrl } from '../Utils'
import { appConfig } from '../appConfig'

const createUrl = async (userId: string, tinyUrl: string, url: string): Promise<iUrl> => {
	const res = await axios.put(
		appConfig.serverUrl,
		{ user_id: userId, tiny_url: tinyUrl, url }
	)

	return res.data
}

export default createUrl