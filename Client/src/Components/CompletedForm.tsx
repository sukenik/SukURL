import React from 'react'
import { Form, Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface iProps {
	url: string
	tinyUrl: string
	setCreatedTinyUrl: React.Dispatch<React.SetStateAction<boolean>>
}

const CompletedForm: React.FC<iProps> = ({ url, tinyUrl, setCreatedTinyUrl }: iProps) => {
    const navigate = useNavigate()

    const handleMyUrlsClick = () => {
		navigate('/my-urls')
    }

	const handleToActive = () => {
		setCreatedTinyUrl(false)
    }

    return (
		<Form>
			<Form.Group>
				<Form.Label>{'🔗 Your Long URL'}</Form.Label>
				<Form.Control readOnly={true} value={url} />
			</Form.Group>
			<Form.Group>
				<Form.Label className='mt-2'>{'🪄 SukURL'}</Form.Label>
				<Form.Control className='mb-2' readOnly={true} value={tinyUrl} />
			</Form.Group>
			<Button onClick={handleToActive} className='w-100'>{'Shorten another'}</Button>
		</Form>
    )
}

export default CompletedForm