import axios from 'axios'
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query'
import createUrl from '../API/createUrl'
import { iUrl } from '../Utils'

interface iReturnType {
	isLoading: boolean
	createUrl: UseMutateFunction<iUrl, unknown, void, unknown>
}

const useCreateUrl = (
	url: string,
	tinyUrl: string,
	setUIError: React.Dispatch<React.SetStateAction<string>>,
	setIsUrlCreated: React.Dispatch<React.SetStateAction<boolean>>,
): iReturnType => {
	const queryClient = useQueryClient()

	const { isLoading, mutate } = useMutation({
		mutationFn: () => createUrl(tinyUrl, url),
		onSuccess: () => {
			setIsUrlCreated(true)
			queryClient.clear()
		},
		onError: (error) => {
			if (axios.isAxiosError(error)) {
				const data = error.response?.data as { detail: string }

				setUIError(data.detail)
			} else {
				setUIError('Failed to create url')
			}
		}
	})

	return { isLoading, createUrl: mutate }
}

export default useCreateUrl