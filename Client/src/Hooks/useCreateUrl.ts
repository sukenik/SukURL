import axios from 'axios'
import { endpoint } from '../index'

const useCreateUrl = async (
	url: string,
	tinyUrl: string,
	setUIError: React.Dispatch<React.SetStateAction<string>>,
	setCreatedUrl: React.Dispatch<React.SetStateAction<boolean>>
) => {
	const response = await axios.put(
		endpoint,
		{ tinyUrl, url }
	)
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

	setCreatedUrl(true)
	return response
}

export default useCreateUrl