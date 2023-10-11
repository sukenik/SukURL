import { useQuery } from '@tanstack/react-query'
import getMyUrls from '../API/getMyUrls'
import { iUrl } from '../Utils'

interface iReturnType {
	urls: iUrl[]
	isLoading: boolean
	isFetching: boolean
}

const useGetMyUrls = (
	page: number,
	tinyUrl: string | undefined
): iReturnType => { 
	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['urls', page],
		queryFn: () => getMyUrls(tinyUrl),
		staleTime: Infinity
	})

	return { urls: data || [], isLoading, isFetching }
}

export default useGetMyUrls