import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import TextField from '@mui/material/TextField'
import React from 'react'
import { IServer } from 'src/types'

export interface IOnDone {
	cancelled: boolean
	editing?: boolean
	server?: IServer
}

interface IProps {
	server: IServer
	editing: boolean
	onDone: (...args: any) => any
}

export default function ServerEditDialog({
	server,
	editing = false,
	onDone = () => {}
}: IProps) {
	const [serverName, setServerName] = React.useState(server?.name)
	const [serverURL, setServerURL] = React.useState(server?.url)
	const [serverUsername, setServerUsername] = React.useState(server?.username)
	const [serverPassword, setServerPassword] = React.useState(server?.password)
	const [mongoDBURL, setMongoDBURL] = React.useState(server?.mongoDB)
	const [type, setType] = React.useState(server?.type || 0)

	const handleOK = () => {
		onDone({
			cancelled: false,
			editing: editing,
			server: {
				id: server?.id,
				type: type,
				name: serverName,
				url: serverURL,
				username: serverUsername,
				password: serverPassword,
				mongoDB: mongoDBURL
			}
		})
	}

	const handleTabChange = (
		_e: React.SyntheticEvent<Element, Event>,
		newTab: number
	) => {
		setType(newTab)
	}

	const handleCancel = () => {
		onDone({ cancelled: true })
	}

	return (
		<>
			<Dialog open={!!server} onClose={handleCancel}>
				<DialogTitle>{editing ? 'Editar' : 'Adicionar'} servidor</DialogTitle>

				<DialogContent>
					<Tabs variant="fullWidth" value={type} onChange={handleTabChange}>
						<Tab label="HTTP"></Tab>
						<Tab label="MongoDB"></Tab>
					</Tabs>

					<TextField
						fullWidth
						label="Nome do servidor"
						margin="dense"
						onChange={(e) => setServerName(e.target.value)}
						sx={{ mb: 2, mt: 2 }}
						value={serverName}
					/>

					<Box
						role="tabpanel"
						hidden={type !== 0}
						sx={{ width: 500, maxWidth: '100%' }}
					>
						<TextField
							autoFocus
							fullWidth
							label="URL do servidor"
							margin="none"
							onChange={(e) => setServerURL(e.target.value)}
							sx={{ mb: 2 }}
							value={serverURL}
						/>

						<TextField
							fullWidth
							label="Nome de usuário (opcional)"
							margin="none"
							onChange={(e) => setServerUsername(e.target.value)}
							size="small"
							sx={{ mb: 2 }}
							value={serverUsername}
						/>

						<TextField
							fullWidth
							label="Senha (opcional)"
							margin="none"
							onChange={(e) => setServerPassword(e.target.value)}
							size="small"
							sx={{ mb: 2 }}
							type="password"
							value={serverPassword}
						/>
					</Box>

					<Box
						role="tabpanel"
						hidden={type !== 1}
						sx={{ width: 500, maxWidth: '100%' }}
					>
						<TextField
							autoFocus
							fullWidth
							label="URL do MongoDB"
							margin="none"
							onChange={(e) => setMongoDBURL(e.target.value)}
							sx={{ mb: 2 }}
							value={mongoDBURL}
						/>

						<Box height={(40 + 16) * 2}></Box>
					</Box>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleCancel}>Cancelar</Button>
					<Button onClick={handleOK}>OK</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
