import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Placement } from 'react-bootstrap/esm/types'

function checkOverflow(el: HTMLElement) {
	console.log(el.style.overflow)

	var curOverflow = el.style.overflow
	const newOverflow = {}
 
	if (!curOverflow || curOverflow === 'visible') {
	   Object.defineProperty(newOverflow, 'overflow', {
			value: el.style.overflow,
			writable: true
		})

		newOverflow?.style?.overflow = 'hidden'
	}
 
	var isOverflowing = el.clientWidth < el.scrollWidth 
	   || el.clientHeight < el.scrollHeight
 
	el.style.overflow = curOverflow
 
	return isOverflowing
}

interface iProps {
	children: JSX.Element
	tooltipText: string
	placement: Placement
}

const OverflowTooltip: React.FC<iProps> = ({ children, tooltipText, placement }) => {
	const isOverflowing = checkOverflow(children.props)

	return (
		isOverflowing
			? <OverlayTrigger
				onEnter={e => checkOverflow(e)}
				overlay={<Tooltip id={tooltipText}>{tooltipText}</Tooltip>}
				placement={placement}
			>
				{children}
			</OverlayTrigger>
			: <div>{children}</div>
	)
}

export default OverflowTooltip