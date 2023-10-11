import React from 'react'
import { Pagination } from 'react-bootstrap'
import { iUrl } from '../Utils'

interface iProps {
	setLastTinyUrl: React.Dispatch<React.SetStateAction<string | undefined>>
	urls: iUrl[]
	page: number
	setPage: React.Dispatch<React.SetStateAction<number>>
	isDisabled: boolean
}

const PaginationOptions: React.FC<iProps> = ({
	setLastTinyUrl, urls, setPage, page, isDisabled
}) => {

	const handleNextClick = () => {
		const lastUrl = urls[urls.length - 1]

		setPage(pageNum => ++pageNum)
		setLastTinyUrl(lastUrl?.tinyUrl)
	}

	const handlePrevClick = () => {
		setPage(pageNum => --pageNum)
	}

	return (
		<Pagination style={{ margin: 0, justifyContent: 'center' }}>
			<Pagination.Prev 
				disabled={isDisabled || page === 0}
				onClick={handlePrevClick}
			/>
			<Pagination.Next
				disabled={isDisabled || urls.length < 5}
				onClick={handleNextClick}
			/>
		</Pagination>
	)
}

export default PaginationOptions