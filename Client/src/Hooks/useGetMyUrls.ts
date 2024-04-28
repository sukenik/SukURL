import { useQuery } from '@tanstack/react-query'
import getMyUrls, { iGetMyUrlsReturnType } from '../API/getMyUrls'
import { useCurrentUserId } from '../Utils'

interface iReturnType {
	urls: iGetMyUrlsReturnType[]
	isLoading: boolean
	isFetching: boolean
}

const useGetMyUrls = (
	page: number,
	tinyUrl: string | undefined
): iReturnType => {
	const userId = useCurrentUserId()

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['urls', page],
		queryFn: () => getMyUrls(userId, tinyUrl),
		staleTime: Infinity,
		enabled: !!userId
	})

	return { urls: data || [], isLoading, isFetching }
}

export default useGetMyUrls