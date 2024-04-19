import React from 'react'
import { useThemeContext } from '../Context/ThemeProvider'

const buttonStyles: React.CSSProperties = {
	bottom: 0,
	left: 0,
	background: 'none',
	border: 0,
	padding: 0,
	position: 'fixed',
	zIndex: 99999,
	display: 'inline-flex',
	margin: '.5em',
	fontSize: '32px'
}

const ThemeButton: React.FC = () => {
	const { darkTheme, toggleDarkTheme } = useThemeContext()

	return (
		<button style={buttonStyles} onClick={toggleDarkTheme}>
			{darkTheme ? '☀️' : '🌑'}
		</button>
	)
}

export default ThemeButton