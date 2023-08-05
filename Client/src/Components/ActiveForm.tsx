import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import useCreateUrl from '../Hooks/useCreateUrl'
import { endpoint } from '../index'
import { isValidUrl } from '../Utils'

interface iProps {
	setCreatedTinyUrl: React.Dispatch<React.SetStateAction<boolean>>
	url: string
	setUrl: React.Dispatch<React.SetStateAction<string>>
	tinyUrl: string
	setTinyUrl: React.Dispatch<React.SetStateAction<string>>
}

const ALPHANUMERIC_REGEX = /^[a-z0-9]+$/i

const ActiveForm: React.FC<iProps> = ({
	setCreatedTinyUrl, url, setUrl, tinyUrl, setTinyUrl
}: iProps) => {
    const [urlError, setUrlError] = useState<string>('')
    const [tinyUrlError, setTinyUrlError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const resetErrors = () => {
        setUrlError('')
        setTinyUrlError('')
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.currentTarget.value || '')
    }

    const handleTinyUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTinyUrl(e.currentTarget.value || '')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        resetErrors()

        if (!url) return setUrlError('The URL field is required.')

        if (!tinyUrl || tinyUrl.length < 5) {
            return setTinyUrlError('The Alias must be at least 5 characters.')
        } else if (!tinyUrl.match(ALPHANUMERIC_REGEX)) {
            return setTinyUrlError('The Alias format is invalid.')
        }

        if (!isValidUrl(url)) {
            return setUrlError('Invalid URL.')
        }

        try {
            resetErrors()
            setIsLoading(true)
            const response = await useCreateUrl(url, tinyUrl, setTinyUrlError, setCreatedTinyUrl)
            setTinyUrl(response?.data.tinyUrl || '')
        } catch {
            setTinyUrlError('Failed to create url')
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>{'🔗 Shorten a long URL'}</Form.Label>
				<Form.Control onChange={handleUrlChange} autoComplete='false' />
				{urlError && <Alert className='my-2' variant='danger'>{urlError}</Alert>}
			</Form.Group>
			<Form.Group>
				<Form.Label className='mt-2'>{'🪄 Customize your link'}</Form.Label>
				<Form.Control className='mb-2' disabled={true} placeholder={endpoint} />
				<Form.Control
					onChange={handleTinyUrlChange}
					autoComplete='false'
					placeholder='Enter alias'
				/>
				{tinyUrlError && <Alert className='my-2' variant='danger'>{tinyUrlError}</Alert>}
				<Form.Text>{'Alias must be at least 5 alphanumeric characters.'}</Form.Text>
			</Form.Group>
			<Button
				disabled={isLoading}
				className='w-100 mt-4'
				type='submit'
			>
				{isLoading ? 'Loading...' : 'Shorten URL'}
			</Button>
		</Form>
    )
}

export default ActiveForm