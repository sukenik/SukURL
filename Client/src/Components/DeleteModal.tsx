import React, { CSSProperties } from 'react'
import useDeleteUrl from '../Hooks/useDeleteUrl'
import OverflowTooltip from './OverflowTooltip'

const MODAL_WIDTH = '500px'
const URL_MAX_WIDTH = '275px'

const modalBackground: CSSProperties = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const modalContent: CSSProperties = {
    width: MODAL_WIDTH,
    backgroundColor: '#fff',
	borderRadius: '10px'
}

const modalTitle: CSSProperties = {
    textAlign: 'center',
    margin: 0,
    fontSize: 30,
    wordWrap: 'break-word',
    padding: '10px'
}

const StyledButton: CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid red',
    color: 'red',
    padding: '10px 16px',
    fontSize: 16,
    cursor: 'pointer',
    margin: '5px',
	borderRadius: '5px',
	fontWeight: '500'
}

const modalBody: CSSProperties = {
    padding: '10px',
    borderTop: '1px solid #eee',
	marginTop: '20px',
	display: 'flex',
	justifyContent: 'space-between'
}

const urlText: CSSProperties = {
    overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	maxWidth: URL_MAX_WIDTH
}

const urlTextContainer: CSSProperties = {
    display: 'flex',
	margin: '0 5px',
	fontSize: '17px'
}

interface iProps {
	urlToDelete: string
	setUrlToDelete: React.Dispatch<React.SetStateAction<string>>
	page: number
}

const DeleteModal: React.FC<iProps> = ({ urlToDelete, setUrlToDelete, page }) => {
	const deleteUrl = useDeleteUrl(urlToDelete, page)

	const closeModal = () => {
		setUrlToDelete('')
	}

	const handleContentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.stopPropagation()
	}

	const handleSubmit = () => {
		deleteUrl()
		closeModal()
	}

	return (
		<div style={modalBackground} onClick={closeModal}>
			<div style={modalContent} onClick={handleContentClick}>
				<div style={{ padding: '10px' }}>
					<p style={modalTitle}>{'Delete URL'}</p>
					<div style={urlTextContainer}>
						<div style={{ marginRight: 'auto' }}>{'Sure you want to delete'}</div>
						<OverflowTooltip title={urlToDelete}>
							<div style={urlText}>{`"${urlToDelete}`}</div>
						</OverflowTooltip>
						<div>{'"?'}</div>
					</div>
				</div>
				<div style={modalBody}>
					<button
						style={{ ...StyledButton, padding: '0 20px' }} 
						onClick={handleSubmit}
					>
						{'Delete'}
					</button>
					<button
						style={{ ...StyledButton, border: '1px solid', color: 'black' }}
						onClick={closeModal}
					>
						{'Cancel'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default DeleteModal