type Color =
	| 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'blackBright'
	| 'gray'
	| 'grey'
	| 'redBright'
	| 'greenBright'
	| 'yellowBright'
	| 'blueBright'
	| 'magentaBright'
	| 'cyanBright'
	| 'whiteBright'

export default function Color({ color }: { color: Color }) {
	const COLORS = {
		black: '#000000',
		red: '#842029',
		green: '#0f5132',
		yellow: '#997404',
		blue: '#084298',
		magenta: '#432874',
		cyan: '#087990',
		white: '#dddddd',
		blackBright: '#6c757d',
		gray: '#6c757d',
		grey: '#6c757d',
		redBright: '#dc3545',
		greenBright: '#198754',
		yellowBright: '#ffc107',
		blueBright: '#0d6efd',
		magentaBright: '#6f42c1',
		cyanBright: '#0dcaf0',
		whiteBright: '#ffffff'
	}

	return (
		<div
			title={color}
			style={{
				backgroundColor: COLORS[color],
				borderRadius: '50%',
				width: '24px',
				height: '24px',
				border: 'white 2px solid',
				display: 'inline-block',
				marginLeft: '4px'
			}}
		/>
	)
}
