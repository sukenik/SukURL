import React, { useState } from 'react'
import { Card, Container, Button } from 'react-bootstrap'
import ActiveForm from './Components/ActiveForm'
import CompletedForm from './Components/CompletedForm'
import { useNavigate } from 'react-router-dom'
import ThemeButton from './Components/ThemeButton'

const App: React.FC = () => {
    const [url, setUrl] = useState<string>('')
    const [tinyUrl, setTinyUrl] = useState<string>('')
    const [isCreatedUrl, setIsUrlCreated] = useState<boolean>(false)

    const navigate = useNavigate()

    const handleMyUrlsClick = () => {
		navigate('/my-urls')
    }

    return (
        <Container
            className={'d-flex align-items-center justify-content-center'}
            style={{ minHeight: '100vh' }}
        >
            <div className='w-100' style={{ maxWidth: '500px' }}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>{'SukURL'}</h2>
                        {isCreatedUrl
                            ? <CompletedForm
                                url={url}
                                tinyUrl={tinyUrl}
                                setIsUrlCreated={setIsUrlCreated}
                            />
                            : <ActiveForm
                                setIsUrlCreated={setIsUrlCreated}
                                url={url}
                                setUrl={setUrl}
                                tinyUrl={tinyUrl}
                                setTinyUrl={setTinyUrl}
                            />
                        }
                    </Card.Body>
                </Card>
                <Button
                    className='w-100 mt-2'
                    onClick={handleMyUrlsClick}
                    variant={'outline-primary'}
                >
                    {'My URLs'}
                </Button>
            </div>
            <ThemeButton />
        </Container>
    )
}

export default App