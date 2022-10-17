import FileDownloadIcon from '@mui/icons-material/FileDownload'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Snackbar from '@mui/material/Snackbar'
import React from 'react'
import downloadFile from 'src/utils/download-file'
import { jsonParse } from 'src/utils/json'
import readFile from 'src/utils/read-file'

interface IProps {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ImportExportDialog({ open, setOpen }: IProps) {
	const [successSnackBarOpen, setSuccessSnackBarOpen] = React.useState(false)
	const [errorSnackBarOpen, setErrorSnackBarOpen] = React.useState(false)
	const [errorMessage, setErrorMessage] = React.useState('Erro desconhecido')

	// Fecha o diálogo
	const handleOK = () => {
		setOpen(false)
	}

	const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]!
		if (!file) return
		try {
			const servers = await readFile(file)
			localStorage.setItem('logs.servers', JSON.stringify(servers))
			setSuccessSnackBarOpen(true)
			location.reload()
		} catch (err: any) {
			console.error(err)
			setErrorMessage(err.message)
			setErrorSnackBarOpen(true)
		}
	}

	const handleExport = () => {
		const servers = jsonParse(localStorage.getItem('logs.servers'), undefined, [])
		downloadFile(servers)
	}

	return (
		<>
			<Dialog open={open} onClose={() => setOpen(false)} scroll="body">
				<DialogTitle>Importar/exportar servidores</DialogTitle>

				<DialogContent sx={{ minWidth: 280 }}>
					<Box textAlign="center">
						<Button onClick={() => {}} startIcon={<FileUploadIcon />} component="label">
							<input hidden type="file" accept="application/json" onChange={handleImport} />
							Importar servidores
						</Button>
					</Box>

					<Box textAlign="center">
						<Button onClick={handleExport} startIcon={<FileDownloadIcon />}>
							Exportar servidores
						</Button>
					</Box>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleOK}>OK</Button>
				</DialogActions>
			</Dialog>

			<Snackbar
				open={successSnackBarOpen}
				autoHideDuration={6000}
				onClose={() => setSuccessSnackBarOpen(false)}
				message="Servidores importados com sucesso"
			/>

			<Snackbar
				open={errorSnackBarOpen}
				autoHideDuration={6000}
				onClose={() => setErrorSnackBarOpen(false)}
				message={'Erro ao importar servidores: ' + errorMessage}
			/>
		</>
	)
}
