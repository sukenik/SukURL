import axios from 'axios'
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query'
import createUrl from '../API/createUrl'
import { iUrl, useCurrentUserId } from '../Utils'

interface iReturnType {
	isLoading: boolean
	createUrl: UseMutateFunction<iUrl, unknown, void, unknown>
}

const useCreateUrl = (
	url: string,
	tinyUrl: string,
	setUIError: React.Dispatch<React.SetStateAction<string>>,
): iReturnType => {
	const userId = useCurrentUserId()
	const queryClient = useQueryClient()

	const { isLoading, mutate } = useMutation({
		mutationFn: () => createUrl(userId, tinyUrl, url),
		onSuccess: () => {
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