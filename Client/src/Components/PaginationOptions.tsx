import React from 'react'
import { Pagination } from 'react-bootstrap'
import { MY_URLS_LIMIT_NUM, UrlEntity } from '../Utils'

interface iProps {
	urls: UrlEntity[]
	offset: number
	setOffset: React.Dispatch<React.SetStateAction<number>>
}

const PaginationOptions: React.FC<iProps> = ({ setOffset, urls, offset }) => {

	const handleNextClick = () => {
		if (!urls.length) {
			return
		}
		setOffset(currNum => currNum + MY_URLS_LIMIT_NUM)
	}

	const handlePrevClick = () => {
		setOffset(currNum => 
			!!currNum
				? currNum - MY_URLS_LIMIT_NUM
				: currNum
		)
	}

	return (
		<Pagination style={{ margin: 0, justifyContent: 'center' }}>
			<Pagination.Prev disabled={!offset} onClick={handlePrevClick} />
			<Pagination.Next disabled={urls.length < 5} onClick={handleNextClick} />
		</Pagination>
	)
}

export default PaginationOptions