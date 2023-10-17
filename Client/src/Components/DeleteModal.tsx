import React, { CSSProperties } from 'react'
import useDeleteUrl from '../Hooks/useDeleteUrl'

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
    width: 500,
    backgroundColor: '#fff',
	borderRadius: '10px'
}

const modalTitle: CSSProperties = {
    textAlign: 'center',
    margin: 0,
    fontSize: 30,
    wordWrap: 'break-word',
    padding: 10
}

const StyledButton: CSSProperties = {
    backgroundColor: 'white',
    border: '1px solid red',
    color: 'red',
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 16,
    fontSize: 16,
    cursor: 'pointer',
    margin: 5,
	borderRadius: '5px',
	fontWeight: '500'
}

const modalBody: CSSProperties = {
    padding: 10,
    borderTop: '1px solid #eee',
	marginTop: 20,
	display: 'flex',
	justifyContent: 'space-between'
}

const urlText: CSSProperties = {
    overflow: 'hidden',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
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
				<div style={{ padding: 10 }}>
					<p style={modalTitle}>{'Delete URL'}</p>
					<div style={urlTextContainer}>
						<div style={{ minWidth: '39%' }}>{'Sure you want to delete'}</div>
						<div style={urlText}>{`"${urlToDelete}`}</div>
						<div>{'"?'}</div>
					</div>
				</div>
				<div style={modalBody}>
					<button
						style={{ ...StyledButton, paddingRight: '20px', paddingLeft: '20px' }} 
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