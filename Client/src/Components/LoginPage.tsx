import React, { useState } from 'react'
import { Alert, Button, Card, Container } from 'react-bootstrap'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { APP_NAME } from '../Utils'
import GoogleLogo from '../../assets/Google.png'

const iconStyle: React.CSSProperties = {
    height: 24,
    width: 24,
	margin: '0 10px'
}

const LoginPage: React.FC = () => {
	const [error, setError] = useState('')

	const { currentUser, signWithGoogle, loading, setLoading } = useAuth()
    const navigate = useNavigate()

	const handleSignWithGoogle = async () => {
		if (currentUser) {
			return navigate('/')
		}

        try {
            setError('')
            setLoading(true)
            await signWithGoogle()
            navigate('/')
        } catch {
            setError('Failed to sign in')
            setLoading(false)
        }
	}
	return (
        <Container
            className='d-flex align-items-center justify-content-center' 
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '500px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>{APP_NAME}</h2>
						<Button
							onClick={handleSignWithGoogle} 
							disabled={loading} 
							className='w-100 mt-4'
							variant='light' 
							type='button'
						>
							<img 
								style={iconStyle} 
								src={GoogleLogo} 
								alt='Continue with Google' 
							/>
							{'Continue With Google'}
						</Button>
						{
							error &&
							<Alert className={'mt-4'} variant="danger">{error}</Alert>
						}
                    </Card.Body>
                </Card>
            </div>
        </Container>
	)
}

export default LoginPage