import React, { CSSProperties } from 'react'
import { ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { iUrl } from '../Utils'

const linkWrapper: CSSProperties = {
	width: '48%',
	textAlign: 'left',
	maxHeight: '100px',
	display: 'flex'
}

const linkStyles: CSSProperties = {
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
			<div style={linkWrapper}>
				<OverlayTrigger
					overlay={<Tooltip id={tinyUrl}>{tinyUrl}</Tooltip>}
					placement={'top'}
				>
					<Link style={linkStyles} target={'_blank'} to={url}>{tinyUrl}</Link>
				</OverlayTrigger>
			</div>
			<div style={{ ...linkWrapper, width: '47%' }}>
				<OverlayTrigger
					overlay={<Tooltip id={tinyUrl}>{url}</Tooltip>}
					placement={'top'}
				>
					<Link style={linkStyles} target={'_blank'} to={url}>{url}</Link>
				</OverlayTrigger>
			</div>
			<div style={{ cursor: 'pointer' }} onClick={handleDelete}>
				{'🗑️'}
			</div>
		</ListGroup.Item>
	)
}

export default UrlRow