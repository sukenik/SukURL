import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { SERVER_URL } from '../AppConfig'

interface iProps {
	url: string
	tinyUrl: string
	setIsUrlCreated: React.Dispatch<React.SetStateAction<boolean>>
}

const CompletedForm: React.FC<iProps> = ({ url, tinyUrl, setIsUrlCreated }: iProps) => {

	const handleToActive = () => {
		setIsUrlCreated(false)
    }

    return (
		<Form>
			<Form.Group>
				<Form.Label>{'🔗 Your Long URL'}</Form.Label>
				<Form.Control readOnly={true} value={url} />
			</Form.Group>
			<Form.Group>
				<Form.Label className='mt-2'>{'🪄 SukURL'}</Form.Label>
				<Form.Control className='mb-2' readOnly={true} value={`${SERVER_URL}/url/${tinyUrl}`} />
			</Form.Group>
			<Alert variant='success'>{'URL successfully created!'}</Alert>
			<Button onClick={handleToActive} className='w-100'>{'Shorten another'}</Button>
		</Form>
    )
}

export default CompletedForm