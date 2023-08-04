import { hot } from 'react-hot-loader'
import React, { useRef, useState } from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import useCreateUrl from './Hooks/useCreateUrl'

const App: React.FC = () => {
    const urlRef = useRef<HTMLInputElement>(null)
    const tinyUrlRef = useRef<HTMLInputElement>(null)

    const [urlError, setUrlError] = useState<string>('')
    const [tinyUrlError, setTinyUrlError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const resetErrors = () => {
        setUrlError('')
        setTinyUrlError('')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        resetErrors()

        const url = urlRef.current?.value
        const tinyUrl = tinyUrlRef.current?.value

        if (!url) return setUrlError('The URL field is required.')

        if (!tinyUrl || tinyUrl.length < 5) {
            return setTinyUrlError('The Alias must be at least 5 characters.')
        } else if (!tinyUrl.match(/^[a-z0-9]+$/i)) {
            return setTinyUrlError('The Alias format is invalid.')
        }

        try {
            resetErrors()
            setIsLoading(true)
            await useCreateUrl(url, tinyUrl, setTinyUrlError)
        } catch {
            setTinyUrlError('Failed to create url')
            setIsLoading(false)
        } finally {
            setIsLoading(false)
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
                        <h2 className='text-center mb-4'>{'SukURL'}</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>{'Shorten a long URL'}</Form.Label>
                                <Form.Control ref={urlRef} autoComplete='false' />
                                {urlError && <Alert className='my-2' variant='danger'>{urlError}</Alert>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>{'Customize your link'}</Form.Label>
                                <Form.Control className='mb-2' disabled={true} placeholder='sukurl.com' />
                                <Form.Control
                                    ref={tinyUrlRef}
                                    autoComplete='false'
                                    placeholder='Enter alias'
                                />
                                {tinyUrlError && <Alert className='my-2' variant='danger'>{tinyUrlError}</Alert>}
                            </Form.Group>
                            <Form.Text>{'Alias must be at least 5 alphanumeric characters.'}</Form.Text>
                            <Button
                                disabled={isLoading}
                                className='w-100 mt-4'
                                type='submit'
                            >
                                {isLoading ? 'Loading...' : 'Shorten URL'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}

export default hot(module)(App)