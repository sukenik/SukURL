import React from 'react'
import { ListGroup, Spinner, Alert } from 'react-bootstrap'
import { iUrl } from '../Utils'
import UrlRow from './UrlRow'
import { useThemeContext } from '../Context/ThemeProvider'

const titleStyle: React.CSSProperties = {
	textDecoration: 'underline',
	width: '48%'
}

interface iProps {
	urls: iUrl[]
	isLoading: boolean
	handleDeleteUrl: React.Dispatch<React.SetStateAction<string>>
}

const UrlsList: React.FC<iProps> = ({ urls, isLoading, handleDeleteUrl }) => {
  const { darkTheme } = useThemeContext()

  return (
    <ListGroup
		variant='flush'
		style={{
			height: '500px',
			marginBottom: '5px',
			overflowY: 'visible'
		}}
	>
		<ListGroup.Item style={{
			display: 'flex',
			backgroundColor: darkTheme ? 'black' : 'white'
		}}>
			<div style={{
				...titleStyle,
				color: darkTheme ? 'white' : 'black'
			}}>
				{'From:'}
			</div>
			
			<div style={{
				...titleStyle,
				color: darkTheme ? 'white' : 'black'
			}}>
				{'To:'}
			</div>
		</ListGroup.Item>	
		{isLoading
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