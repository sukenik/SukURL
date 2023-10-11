import React, { useState } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import UrlsList from './UrlsList'
import { useNavigate } from 'react-router-dom'
import PaginationOptions from './PaginationOptions'
import useGetMyUrls from '../Hooks/useGetMyUrls'

const MyUrlsPage: React.FC = () => {
	const [page, setPage] = useState<number>(0)
	const [lastTinyUrl, setLastTinyUrl] = useState<string>()

	const { urls, isLoading, isFetching } = useGetMyUrls(page, lastTinyUrl)

	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1)
	}

	return (
        <Container
            className='d-flex align-items-center justify-content-center' 
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '700px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>{'📃 My URLs'}</h2>
                        <UrlsList urls={urls} isLoading={isLoading} />
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
        </Container>
	)
}

export default MyUrlsPage