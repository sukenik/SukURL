import axios from 'axios'
import { appConfig } from '../AppConfig'

const deleteUrl = async (tinyUrl: string): Promise<void> => {
	await axios.delete(`${appConfig.serverUrl}/${tinyUrl}`)
}

export default deleteUrl