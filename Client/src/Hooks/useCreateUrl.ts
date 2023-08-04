import axios from 'axios'
import { endpoint } from '../index'

const useCreateUrl = async (
	url: string,
	tinyUrl: string,
	setUIError: React.Dispatch<React.SetStateAction<string>>
) => {
	const response = await axios.put(`${endpoint}?url_text=${url}&tiny_url=${tinyUrl}`)
		.catch(error => {
			if (error.response) {
				setUIError(error.response.data.detail)
			} else if (error.request) {
				console.log(error.request)
				throw Error(error)
			} else {
				console.log('Error', error.message)
				throw Error(error)
			}
		})
	
	return response
}

export default useCreateUrl