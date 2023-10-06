import axios from 'axios'
import { endpoint } from '../index'

const useCreateUrl = async (
	url: string,
	tinyUrl: string,
	setUIError: React.Dispatch<React.SetStateAction<string>>,
) => {
	const response = await axios.put(
		endpoint,
		{ tiny_url: tinyUrl, url }
	)
	.catch(error => {
		if (error.response) {
			setUIError(error.response.data.detail)
		} else if (error.request) {
			setUIError('Failed to create url')
		} else {
			setUIError('Failed to create url')
		}

		return null
	})

	return response
}

export default useCreateUrl