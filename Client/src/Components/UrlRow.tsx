import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UrlEntity } from '../Utils'

interface iProps {
	url: UrlEntity
}

const UrlRow: React.FC<iProps> = ({ url }: iProps) => {
	return (
		<ListGroup.Item key={url.tinyUrl} style={{ display: 'flex' }}>
			<Link
				target='_blank'
				style={{ width: '50%' }}
				to={url.tinyUrl}
			>
				{url.tinyUrl}
			</Link>
			<p>{' ➡️ '}</p>
			<Link
				target='_blank'
				style={{ width: '50%' }}
				to={url.tinyUrl}
			>
				{url.url}
			</Link>
		</ListGroup.Item>
	)
}

export default UrlRow