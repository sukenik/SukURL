import React from 'react'
import { ListGroup, Spinner, Alert } from 'react-bootstrap'
import { URLEntity } from './MyUrlsPage'
import { Link } from 'react-router-dom'

interface iProps {
	urls: URLEntity[]
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
			: urls.length
				? urls.map(url =>
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
				: <Alert variant={'info'}>
					{'No URLs'}
				</Alert>
		}
    </ListGroup>
  );
}

export default UrlsList