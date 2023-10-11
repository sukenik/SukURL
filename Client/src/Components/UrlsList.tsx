import React from 'react'
import { ListGroup, Spinner, Alert } from 'react-bootstrap'
import { iUrl } from '../Utils'
import UrlRow from './UrlRow'

interface iProps {
	urls: iUrl[]
	isLoading: boolean
}

const UrlsList: React.FC<iProps> = ({ urls, isLoading }) => {
  return (
    <ListGroup
		variant='flush'
		style={{
			height: '500px',
			marginBottom: '5px',
			overflowY: 'visible'
		}}
	>
		<ListGroup.Item style={{ display: 'flex', justifyContent: 'space-around' }}>
			<p style={{ textDecoration: 'underline' }}>{'From:'}</p>
			<p style={{ textDecoration: 'underline' }}>{'To:'}</p>
		</ListGroup.Item>	
		{isLoading
			? <Spinner variant='primary' style={{ margin: 'auto auto' }} />
			: !!urls.length
				? urls.map(url =>
					<UrlRow key={url.tinyUrl} urlEntity={url} />
				)
				: <Alert variant={'info'} className={'mt-3'} style={{textAlign: 'center'}}>
					{'No URLs'}
				</Alert>
		}
    </ListGroup>
  );
}

export default UrlsList