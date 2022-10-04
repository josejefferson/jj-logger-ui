interface IProps {
	level: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO' | 'DEBUG'
	children: JSX.Element
}

export default function Pill({ level, children }: IProps) {
	const LEVELS = {
		SUCCESS: '#198754',
		WARNING: '#ffc107',
		ERROR: '#dc3545',
		INFO: '#0d6efd',
		DEBUG: '#111111'
	}

	return (
		<div
			style={{
				backgroundColor: LEVELS[level],
				color: 'white',
				borderRadius: '1000px',
				padding: '5px 10px',
				textAlign: 'center',
				fontWeight: 'bold',
				fontSize: '10px'
			}}
		>
			{children}
		</div>
	)
}
