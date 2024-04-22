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
	opacity: 0
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
	location: {
		x: string
		y: string
	}
}

const Tooltip: React.FC<iProps> = ({ children, title, location }) => {
	const [hasMounted, setHasMounted] = useState(false)
	const { x, y } = location
	console.log(x, y)

	useEffect(() => {
		setHasMounted(true)
	}, [])

	return (
		<div style={container}>
			{children}
				<span style={{
					...textStyle,
					opacity: hasMounted ? 1 : 0,
					transform: `translate3d(${x}, ${y})`
				}}>
					{title}
					<span style={arrowStyle}></span>
				</span>
		</div>
	)
}

export default Tooltip