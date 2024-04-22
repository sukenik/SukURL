import React from 'react'
import { useMemo, useState } from 'react'
import Tooltip from './Tooltip'
import { v4 as uuid } from 'uuid'

const checkOverflow = (id: string) => {
	const el = document.getElementById(id)?.children[0] as HTMLElement

	if (el) {
		const curOverflow = el.style.overflow

		if (!curOverflow || curOverflow === 'visible') {
			el.style.overflow = 'hidden'
		}

		const isOverflowing = el.clientWidth < el.scrollWidth
			|| el.clientHeight < el.scrollHeight

		el.style.overflow = curOverflow

		return isOverflowing
	}

	return false
}

interface iProps {
	children: React.ReactElement<{ isOverflowing: boolean }>
	title: string
	showTooltip?: boolean
}

const OverflowTooltip: React.FC<iProps> = ({ children, title, showTooltip }) => {
	const [isOverflowing, setIsOverflowing] = useState(false)
	const id = useMemo(() => uuid(), [])

	const onMouseEnter = () => setIsOverflowing(showTooltip || checkOverflow(id))
	const onMouseLeave = () => setIsOverflowing(false)

	const textContainer = (
		<div id={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			{children}
		</div>
	)

	return (
		isOverflowing
			? (
				<Tooltip title={title} elementId={id}>
					{textContainer}
				</Tooltip>
			)
			: textContainer
	)
}

export default OverflowTooltip