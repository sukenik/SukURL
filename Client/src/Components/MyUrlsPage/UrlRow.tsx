import React, { CSSProperties } from 'react'
import { ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import OverflowTooltip from '../OverflowTooltip'
import { TINY_URL_WIDTH, URL_WIDTH } from './UrlsList'
import { iGetMyUrlsReturnType } from '../../API/getMyUrls'

const linkWrapper: CSSProperties = {
	textAlign: 'left',
	maxHeight: '100px',
}

const linkStyles: CSSProperties = {
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	display: 'block'
}

const deleteIcon: CSSProperties = {
	cursor: 'pointer',
	marginLeft: 'auto'
}

interface iProps {
	urlEntity: iGetMyUrlsReturnType
	handleDeleteUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlRow: React.FC<iProps> = ({ urlEntity, handleDeleteUrl }: iProps) => {
	const { url, tinyUrl, visitsNum } = urlEntity

	const handleDelete = () => {
		handleDeleteUrl(tinyUrl)
	}

	return (
		<ListGroup.Item
			key={tinyUrl}
			style={{ display: 'flex' }}
		>
			<div style={{ ...linkWrapper, width: TINY_URL_WIDTH }}>
				<OverflowTooltip title={tinyUrl}>
					<Link style={linkStyles} target={'_blank'} to={url}>{tinyUrl}</Link>
				</OverflowTooltip>
			</div>
			<div style={{ ...linkWrapper, width: URL_WIDTH }}>
				<OverflowTooltip title={url}>
					<Link style={linkStyles} target={'_blank'} to={url}>{url}</Link>
				</OverflowTooltip>
			</div>
			<div style={{ margin: 'auto' }}>
				{visitsNum}
			</div>
			<div style={deleteIcon} onClick={handleDelete}>
				<OverflowTooltip title={'Delete url'} showTooltip>
					<div>{'🗑️'}</div>
				</OverflowTooltip>
			</div>
		</ListGroup.Item>
	)
}

export default UrlRow