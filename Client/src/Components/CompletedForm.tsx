import React from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { appConfig } from '../appConfig'
import OverflowTooltip from './OverflowTooltip'

const textStyle: React.CSSProperties = {
	fontSize: '18px',
	color: '#198754'
}

const copyButton: React.CSSProperties = {
	width: '40%',
	margin: '8px 0'
}

interface iProps {
	url: string
	tinyUrl: string
	setIsUrlCreated: React.Dispatch<React.SetStateAction<boolean>>
}

const CompletedForm: React.FC<iProps> = ({ url, tinyUrl, setIsUrlCreated }: iProps) => {
	const parsedTinyUrl = `${appConfig.serverUrl}/url/${tinyUrl}`

	const handleToActive = () => {
		setIsUrlCreated(false)
	}

	const handleCopy = () => {
		navigator.clipboard.writeText(parsedTinyUrl)
	}

    return (
		<Form>
			<Form.Group>
				<Form.Label>{'🔗 Your Long URL'}</Form.Label>
				<Form.Control
					readOnly={true}
					value={url}
					style={textStyle}
				/>
			</Form.Group>
			<Form.Group>
				<Form.Label className='mt-2'>{'🪄 SukURL'}</Form.Label>
				<Form.Control
					className='mb-2'
					readOnly={true}
					value={parsedTinyUrl}
					style={textStyle}
				/>
			</Form.Group>
			<div style={copyButton}>
				<OverflowTooltip title={'Copy to Clipboard'} showTooltip>
					<Button variant={'success'} onClick={handleCopy} className={'w-100'}>
						{'📑 Copy'}
					</Button>
				</OverflowTooltip>
			</div>
			<Alert variant={'success'}>{'URL successfully created!'}</Alert>
			<Button onClick={handleToActive} className={'w-100'}>{'Shorten another'}</Button>
		</Form>
    )
}

export default CompletedForm