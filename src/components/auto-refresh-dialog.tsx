import RefreshIcon from '@mui/icons-material/Refresh'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import React from 'react'
import { IData } from 'src/types'
import { getFetchedData } from 'src/utils/fetch-data'
import lang from '../utils/lang'
import { defaultData, errorData, notConfigured } from './placeholders'

interface IProps {
	fetchData: (filter?: string | undefined) => Promise<void>
	filter: string | undefined
	data: IData[]
	setData: React.Dispatch<React.SetStateAction<any>>
}

export default function AutoRefreshDialog({
	fetchData,
	filter,
	data,
	setData
}: IProps) {
	const [open, setOpen] = React.useState(false)
	const [autoUpdateEnabled, setAutoUpdateEnabled] = React.useState<boolean>()
	const [autoUpdateInterval, setAutoUpdateInterval] = React.useState<number>()
	const [autoUpdateTimer, setAutoUpdateTimer] = React.useState<NodeJS.Timer>()

	// Referências para usar dentro do setTimeout
	const lastUpdate = React.useRef(new Date())
	const dataRef = React.useRef(data)
	const autoUpdateIntervalRef = React.useRef<any>(autoUpdateInterval)
	const autoUpdateTimerRef = React.useRef<any>(autoUpdateTimer)
	const filterRef = React.useRef<any>(filter)

	// Atualiza as referências
	React.useEffect(() => {
		dataRef.current = data
		autoUpdateIntervalRef.current = autoUpdateInterval
		autoUpdateTimerRef.current = autoUpdateTimer
		filterRef.current = filter
	}, [data, autoUpdateInterval, autoUpdateTimer, filter])

	// Preenche os dados pela primeira vez
	React.useEffect(() => {
		const auEnabled = !!localStorage.getItem('logs.autoUpdate.enabled')
		const auIntervalString = localStorage.getItem('logs.autoUpdate.interval')
		const auIntervalNumber = auIntervalString ? Number(auIntervalString) : NaN
		const auInterval = isNaN(auIntervalNumber) ? undefined : auIntervalNumber
		setAutoUpdateEnabled(auEnabled)
		setAutoUpdateInterval(auInterval ?? 5)
	}, [])

	// Atualiza os logs
	function update() {
		if (
			dataRef.current[0] === defaultData ||
			dataRef.current[0] === errorData ||
			dataRef.current[0] === notConfigured
		) {
			if (autoUpdateIntervalRef.current) {
				const timer = setTimeout(update, autoUpdateIntervalRef.current * 1000)
				setAutoUpdateTimer(timer)
			}
			return
		}

		// Baixa os novos logs
		getFetchedData(filterRef.current, lastUpdate.current)
			.then(({ data: logs }) => {
				if (logs.length) setData([...logs, ...dataRef.current])
				if (!isNaN(Number(new Date(logs[logs.length - 1]?.date)))) {
					lastUpdate.current = new Date(logs[logs.length - 1]?.date)
				}
			})
			.finally(() => {
				if (autoUpdateIntervalRef.current) {
					const timer = setTimeout(update, autoUpdateIntervalRef.current * 1000)
					setAutoUpdateTimer(timer)
				}
			})
	}

	// Timer que atualiza os logs
	React.useEffect(() => {
		if (autoUpdateEnabled === undefined) return
		if (autoUpdateInterval === undefined) return
		clearInterval(autoUpdateTimer)

		if (autoUpdateEnabled) {
			const timer = setTimeout(update, autoUpdateInterval * 1000)
			setAutoUpdateTimer(timer)
			return () => clearTimeout(timer)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [autoUpdateEnabled, autoUpdateInterval])

	// Guarda os dados no localStorage
	React.useEffect(() => {
		if (autoUpdateEnabled === undefined) return
		if (autoUpdateInterval === undefined) return

		if (autoUpdateEnabled) {
			localStorage.setItem('logs.autoUpdate.enabled', '1')
		} else {
			localStorage.removeItem('logs.autoUpdate.enabled')
		}
		localStorage.setItem('logs.autoUpdate.interval', String(autoUpdateInterval))
	}, [autoUpdateEnabled, autoUpdateInterval])

	// Fecha o diálogo
	const handleOK = () => {
		setOpen(false)
	}

	const handleContextMenu = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()
		setOpen(true)
	}

	// Ativa/desativa a atualização automática
	const handleChangeAutoUpdateEnabled = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setAutoUpdateEnabled(e.target.checked)
	}

	// Muda a frequência de atualização automática
	const handleChangeAutoUpdateInterval = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		let value = Number(e.target.value)
		if (isNaN(value) || value < 1) return e.preventDefault()
		setAutoUpdateInterval(Number(e.target.value))
	}

	return (
		<>
			<Tooltip title={lang.toolbar.refresh} disableFocusListener>
				<IconButton
					aria-label={lang.toolbar.refresh}
					onClick={() => fetchData(filter)}
					onContextMenu={handleContextMenu}
				>
					<RefreshIcon />
				</IconButton>
			</Tooltip>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>
					Atualizar automaticamente
					<Switch
						checked={!!autoUpdateEnabled}
						onChange={handleChangeAutoUpdateEnabled}
					/>
				</DialogTitle>

				<DialogContent sx={{ minWidth: 280 }}>
					<Typography>Mantém a lista de logs sempre atualizada</Typography>
					<FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
						<TextField
							label="Frequência de atualização"
							type="number"
							autoFocus
							value={autoUpdateInterval}
							onChange={handleChangeAutoUpdateInterval}
							InputProps={{
								inputProps: { min: 1 },
								endAdornment: (
									<InputAdornment position="end">seg</InputAdornment>
								)
							}}
						/>
					</FormControl>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleOK}>OK</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
