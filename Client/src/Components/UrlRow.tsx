import React, { CSSProperties } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { iUrl } from '../Utils'

const linkStyles: CSSProperties = {
	width: '50%',
	textAlign: 'left',
	maxHeight: '100px',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap'
}

interface iProps {
	urlEntity: iUrl
	handleDeleteUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlRow: React.FC<iProps> = ({ urlEntity, handleDeleteUrl }: iProps) => {
	const { url, tinyUrl } = urlEntity

	const handleDelete = () => {
		handleDeleteUrl(tinyUrl)
	}

	return (
		<ListGroup.Item key={tinyUrl} style={{ display: 'flex' }}>
			<div style={linkStyles}>
				<Link target='_blank' to={url}>{tinyUrl}</Link>
			</div>
			<div style={linkStyles}>
				<Link target='_blank' to={url}>{url}</Link>
			</div>
			<div style={{ cursor: 'pointer' }} onClick={handleDelete}>
				{'🗑️'}
			</div>
		</ListGroup.Item>
	)
}

export default UrlRow