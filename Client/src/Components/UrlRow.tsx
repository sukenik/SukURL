import React, { CSSProperties } from 'react'
import { ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { iUrl } from '../Utils'
import OverflowTooltip from './OverflowTooltip'

const linkWrapper: CSSProperties = {
	width: '48%',
	textAlign: 'left',
	maxHeight: '100px',
}

const linkStyles: CSSProperties = {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	display: 'block'
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
		<ListGroup.Item
			key={tinyUrl}
			style={{ display: 'flex' }}
		>
			<div style={linkWrapper}>
				<OverflowTooltip title={tinyUrl}>
					<Link style={linkStyles} target={'_blank'} to={url}>{tinyUrl}</Link>
				</OverflowTooltip>
			</div>
			<div style={{ ...linkWrapper, width: '47%' }}>
				<OverflowTooltip title={url}>
					<Link style={linkStyles} target={'_blank'} to={url}>{url}</Link>
				</OverflowTooltip>
			</div>
			<div style={{ cursor: 'pointer', marginLeft: 'auto' }} onClick={handleDelete}>
				<OverflowTooltip title={'Delete url'} showTooltip>
					<div>{'🗑️'}</div>
				</OverflowTooltip>
			</div>
		</ListGroup.Item>
	)
}

export default UrlRow