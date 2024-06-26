import React, { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import useCreateUrl from '../Hooks/useCreateUrl'
import { isValidUrl } from '../Utils'

interface iProps {
	setIsUrlCreated: React.Dispatch<React.SetStateAction<boolean>>
	url: string
	setUrl: React.Dispatch<React.SetStateAction<string>>
	tinyUrl: string
	setTinyUrl: React.Dispatch<React.SetStateAction<string>>
}

const ALPHANUMERIC_REGEX = /^[a-z0-9]+$/i

const ActiveForm: React.FC<iProps> = ({
	setIsUrlCreated, url, setUrl, tinyUrl, setTinyUrl
}: iProps) => {
    const [urlError, setUrlError] = useState<string>('')
    const [tinyUrlError, setTinyUrlError] = useState<string>('')

    const { createUrl, isLoading } = useCreateUrl(
        url,
        tinyUrl,
        setTinyUrlError
    )

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

    const handleSubmit = (e: React.FormEvent) => {
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

        resetErrors()
        createUrl()
        setIsUrlCreated(true)
    }

    return (
		<Form onSubmit={handleSubmit}>
			<Form.Group>
				<Form.Label>{'🔗 Shorten a long URL'}</Form.Label>
				<Form.Control
                    onChange={handleUrlChange}
                    autoComplete={'false'}
					placeholder={'Enter long link here'}
                    disabled={isLoading}
                />
				{urlError && <Alert className='my-2' variant='danger'>{urlError}</Alert>}
			</Form.Group>
			<Form.Group>
				<Form.Label className='mt-2'>{'🪄 Customize your link'}</Form.Label>
				<Form.Control
					onChange={handleTinyUrlChange}
					autoComplete={'false'}
					placeholder={'Enter alias'}
                    disabled={isLoading}
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