import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { endpoint } from '../index'
import { Card, Container, Button } from 'react-bootstrap'
import UrlsList from './UrlsList'
import { useNavigate } from 'react-router-dom'

export interface URLEntity {
	tinyUrl: string
	url: string
}

const MyUrlsPage: React.FC = () => {
	const [urls, setUrls] = useState<URLEntity[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const navigate = useNavigate()
	
	const handleBack = () => {
		navigate(-1)
	}

	useEffect(() => {
		setIsLoading(true)

		axios.get(`${endpoint}/my-urls`).then((response) => {
			setUrls(response.data.map((url: string) => (
				JSON.parse(url)
			)))
			setIsLoading(false)
		})

		return () => setIsLoading(false)
	}, [])

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