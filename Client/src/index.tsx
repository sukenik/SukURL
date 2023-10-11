import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyUrlsPage from './Components/MyUrlsPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const endpoint = 'http://localhost:8000'
const queryClient = new QueryClient()

const root = document.getElementById('root')
render(
	<QueryClientProvider client={queryClient}>
		<Router>
			<Routes>
				<Route path='/' element={<App />} />
				<Route path='/my-urls' element={<MyUrlsPage />} />
				<Route path='*' element={<App />}/>
			</Routes>
		</Router>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
	, root
)