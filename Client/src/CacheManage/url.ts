import { QueryClient } from '@tanstack/react-query'

export const URLS_CACHE_KEY = 'urls'

export const removeQueriesFromPage = (page: number, queryClient: QueryClient) => {
	const queryCache = queryClient.getQueryCache()
	const allQueryKeys = queryCache.getAll().map(cache => cache.queryKey)

	for (let i = 0; i < allQueryKeys.length; i++) {
		const currKey = allQueryKeys[i]
		const keyPage = currKey[1] as string

		if (Number(keyPage) > page) {
			queryClient.removeQueries({ queryKey: currKey, exact: true })
		}
	}
}