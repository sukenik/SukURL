import axios from 'axios'
import { SERVER_URL } from '../AppConfig'

const deleteUrl = async (tinyUrl: string): Promise<void> => {
	await axios.delete(`${SERVER_URL}/${tinyUrl}`)
}

export default deleteUrl