import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query'
import deleteUrl from '../API/deleteUrl'
import { iUrl } from '../Utils'
import { URLS_CACHE_KEY } from '../AppConfig'
import { removeQueriesFromPage } from '../CacheManage/url'

const useDeleteUrl = (
	tinyUrl: string,
	page: number
): UseMutateFunction => {
	const queryClient = useQueryClient()
	const currPageUrls = queryClient.getQueryData([URLS_CACHE_KEY, page]) as iUrl[]

	const { mutate } = useMutation({
		mutationFn: () => deleteUrl(tinyUrl),
		onSuccess: () => {
			if (currPageUrls.length < 5) {
				queryClient.setQueryData([URLS_CACHE_KEY, page], (currData?: iUrl[]) => {
					const urls = currData || []

					return urls.filter(url => url.tinyUrl !== tinyUrl)
				})
			} else {
				queryClient.invalidateQueries({
					queryKey: [URLS_CACHE_KEY, page],
					exact: true
				})

				removeQueriesFromPage(page, queryClient)
			}
		}
	})

	return mutate
}

export default useDeleteUrl