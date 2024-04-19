import React, { useState } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import UrlsList from './UrlsList'
import { useNavigate } from 'react-router-dom'
import PaginationOptions from './PaginationOptions'
import useGetMyUrls from '../Hooks/useGetMyUrls'
import DeleteModal from './DeleteModal'
import ThemeButton from './ThemeButton'
import { useThemeContext } from '../Context/ThemeProvider'

const MyUrlsPage: React.FC = () => {
	const [page, setPage] = useState<number>(0)
	const [lastTinyUrl, setLastTinyUrl] = useState<string>()
	const [tinyUrlToDelete, setTinyUrlToDelete] = useState<string>('')

	const { urls, isLoading, isFetching } = useGetMyUrls(page, lastTinyUrl)
	const { darkTheme } = useThemeContext()

	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1)
	}

	return (
		<div style={{
			backgroundColor: darkTheme ? 'black' : 'white'
		}}>
			<Container
				className='d-flex align-items-center justify-content-center' 
				style={{ minHeight: '100vh' }}
			>
				<div className='w-100' style={{ maxWidth: '700px' }}>
					<Card style={{ border: '1px solid #0d6efd', borderRadius: '2px' }}>
						<Card.Body style={{
							backgroundColor: darkTheme ? 'black' : 'white',
						}}>
							<h2 className='text-center mb-4' style={{ color: darkTheme ? 'white' : 'inherit' }}>{'📃 My URLs'}</h2>
							<UrlsList
								urls={urls}
								isLoading={isLoading}
								handleDeleteUrl={setTinyUrlToDelete}
							/>
							<PaginationOptions
								setLastTinyUrl={setLastTinyUrl}
								urls={urls}
								page={page}
								setPage={setPage}
								isDisabled={isLoading || isFetching}
							/>
						</Card.Body>
					</Card>
					<Button
						className='w-100 mt-2'
						onClick={handleBack}
						variant={'outline-primary'}
					>
						{'Back'}
					</Button>
				</div>
				<ThemeButton />
				{
					!!tinyUrlToDelete &&
					<DeleteModal
						urlToDelete={tinyUrlToDelete}
						setUrlToDelete={setTinyUrlToDelete}
						page={page}
					/>
				}
			</Container>
		</div>
	)
}

export default MyUrlsPage