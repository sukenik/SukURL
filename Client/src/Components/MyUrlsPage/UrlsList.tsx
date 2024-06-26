import React from 'react'
import { ListGroup, Spinner, Alert } from 'react-bootstrap'
import UrlRow from './UrlRow'
import { iGetMyUrlsReturnType } from '../../API/getMyUrls'

const titleStyle: React.CSSProperties = {
	textDecoration: 'underline',
}

export const TINY_URL_WIDTH = '48%'
export const URL_WIDTH = '33%'

interface iProps {
	urls: iGetMyUrlsReturnType[]
	isLoading: boolean
	handleDeleteUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlsList: React.FC<iProps> = ({ urls, isLoading, handleDeleteUrl }) => {
  return (
    <ListGroup
		variant='flush'
		style={{
			height: '500px',
			marginBottom: '5px',
			overflowY: 'visible'
		}}
	>
		<ListGroup.Item style={{ display: 'flex' }}>
			<div style={{ ...titleStyle, width: TINY_URL_WIDTH }}>{'From:'}</div>
			<div style={{ ...titleStyle, width: URL_WIDTH }}>{'To:'}</div>
			<div style={titleStyle}>{'Click count:'}</div>
		</ListGroup.Item>	
		{
			isLoading
				? <Spinner variant='primary' style={{ margin: 'auto auto' }} />
				: !!urls.length
					? urls.map(url =>
						<UrlRow key={url.tinyUrl} urlEntity={url} handleDeleteUrl={handleDeleteUrl} />
					)
					: <Alert variant={'info'} className={'mt-3'} style={{textAlign: 'center'}}>
						{'No URLs'}
					</Alert>
		}
    </ListGroup>
  );
}

export default UrlsList