import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import MyUrlsPage from './Components/MyUrlsPage/MyUrlsPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import PrivateRoute from './Components/PrivateRoute'
import LoginPage from './Components/LoginPage'
import { AuthProvider } from './Context/AuthContext'
import { appConfig } from './AppConfig'

const queryClient = new QueryClient()

const root = document.getElementById('root')

render(
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='/' element={<PrivateRoute><App /></PrivateRoute>} />
					<Route path='/my-urls' element={<PrivateRoute><MyUrlsPage /></PrivateRoute>} />
					<Route path='/login' element={<LoginPage />} />
				</Routes>
			</Router>
			{
				appConfig.isDevEnv &&
				<ReactQueryDevtools initialIsOpen={false} />
			}
		</AuthProvider>
	</QueryClientProvider>,
	root
)