import FilterAltIcon from '@mui/icons-material/FilterAlt'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import lang from '../utils/lang'

interface IProps {
	fetchData: (filter?: string | undefined) => Promise<void>
	filter: string | undefined
	setFilter: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function DBFilterDialog({
	fetchData,
	filter,
	setFilter
}: IProps) {
	const [open, setOpen] = React.useState(false)
	const [value, setValue] = React.useState(filter)
	const [saveSnackbar, setSaveSnackbar] = React.useState(false)

	React.useEffect(() => {
		setValue(filter)
	}, [filter])

	const handleOK = () => {
		setOpen(false)
		setFilter(value)
		fetchData(value)
	}

	const handleCancel = () => {
		setOpen(false)
	}

	const validateFilter = () => {
		try {
			const result = JSON.parse(value as string)
			return typeof result === 'object'
		} catch {
			return false
		}
	}

	const handleReset = () => {
		const defaultFilter = localStorage.getItem('logs.dbFilter')
		setValue(defaultFilter || '{}')
	}

	const handleSave = () => {
		if (!validateFilter()) return
		localStorage.setItem('logs.dbFilter', value as string)
		setSaveSnackbar(true)
	}

	const handleClear = () => {
		setValue('{}')
	}

	return (
		<>
			<Tooltip title={lang.toolbar.dbFilter} disableFocusListener>
				<IconButton
					aria-label={lang.toolbar.dbFilter}
					onClick={() => setOpen(true)}
				>
					<FilterAltIcon />
				</IconButton>
			</Tooltip>

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Filtros JSON do banco de dados</DialogTitle>

				<DialogContent>
					<TextField
						autoFocus
						error={!validateFilter()}
						fullWidth
						helperText={!validateFilter() && 'JSON inválido'}
						InputProps={{ style: { fontFamily: 'monospace' } }}
						label="JSON"
						margin="dense"
						multiline
						onChange={(e) => setValue(e.target.value)}
						rows={4}
						sx={{ mb: 2 }}
						value={value}
						variant="filled"
					/>

					<Button
						fullWidth
						onClick={handleReset}
						startIcon={<PublishedWithChangesIcon />}
					>
						Redefinir para o padrão
					</Button>
					<Button
						fullWidth
						onClick={handleSave}
						startIcon={<TaskAltIcon />}
						disabled={!validateFilter()}
					>
						Salvar como padrão
					</Button>
					<Button
						fullWidth
						onClick={handleClear}
						startIcon={<RestartAltIcon />}
					>
						Limpar filtros
					</Button>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleCancel}>Cancelar</Button>
					<Button onClick={handleOK} disabled={!validateFilter()}>
						OK
					</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={saveSnackbar}
				autoHideDuration={6000}
				onClose={() => setSaveSnackbar(false)}
				message="Filtro padrão atualizado"
			/>
		</>
	)
}
