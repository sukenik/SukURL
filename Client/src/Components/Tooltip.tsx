import React, { useEffect, useState } from 'react'

const container: React.CSSProperties = {
	position: 'relative',
}

const textStyle: React.CSSProperties = {
	minWidth: '120px',
	maxWidth: '240px',
	backgroundColor: 'black',
	color: '#fff',
	textAlign: 'center',
	padding: '5px',
	borderRadius: '6px',
	position: 'absolute',
	zIndex: 1,
	top: '100%',
	left: '30%',
	marginLeft: '-60px',
	marginTop: '5px',
	transition: 'opacity .2s linear',
	opacity: 0,
	wordWrap: 'break-word'
}

const arrowStyle: React.CSSProperties = {
	content: '',
	position: 'absolute',
	bottom: '100%',
	left: '50%',
	borderWidth: '5px',
	borderStyle: 'solid',
	borderColor: 'transparent transparent black transparent',
}

interface iProps {
	children: React.ReactNode
	title: string
	elementId: string
}

const Tooltip: React.FC<iProps> = ({ children, title, elementId }) => {
	const [hasMounted, setHasMounted] = useState(false)

	const elementLocation = (
		document.getElementById(elementId)?.children[0] as HTMLElement
	)?.getBoundingClientRect()

	useEffect(() => {
		setHasMounted(true)
	}, [])

	return (
		<div style={container}>
			{children}
				<span style={{
					...textStyle,
					opacity: hasMounted ? 1 : 0,
					transform: `translate3d(${elementLocation.x}px, ${elementLocation.y}px)`
				}}>
					{title}
					<span style={arrowStyle}></span>
				</span>
		</div>
	)
}

export default Tooltip