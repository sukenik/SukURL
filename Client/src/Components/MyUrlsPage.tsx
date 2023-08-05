import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoint } from '../index'
import { Card, Container, Button } from 'react-bootstrap'
import UrlsList from './UrlsList'
import { useNavigate } from 'react-router-dom'
import { MY_URLS_LIMIT_NUM, UrlEntity } from '../Utils'
import PaginationOptions from './PaginationOptions'

const MyUrlsPage: React.FC = () => {
	const [urls, setUrls] = useState<UrlEntity[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [offset, setOffset] = useState<number>(0)

	const navigate = useNavigate()

	const handleBack = () => {
		navigate(-1)
	}

	useEffect(() => {
		setIsLoading(true)

		axios.get(
			`${endpoint}/my-urls?limit=${MY_URLS_LIMIT_NUM}&offset=${offset}`
		).then((response) => {
			setUrls(response.data.map((url: string) => (
				JSON.parse(url)
			)))
			setIsLoading(false)
		})

		return () => setIsLoading(false)
	}, [offset])

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
						{!isLoading &&
							<PaginationOptions
								urls={urls}
								offset={offset}
								setOffset={setOffset}
							/>
						}
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