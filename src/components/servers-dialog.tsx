import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import StorageIcon from '@mui/icons-material/Storage'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Tooltip from '@mui/material/Tooltip'
import React from 'react'
import { IServer } from 'src/types'
import { v4 as uuidv4 } from 'uuid'
import { jsonParse } from '../utils/json'
import lang from '../utils/lang'
import ServerEditDialog, { IOnDone } from './server-edit-dialog'

const defaultServer: IServer[] = [
	{
		id: uuidv4(),
		name: '(Servidor padrão)',
		url: './data',
		username: '',
		password: ''
	}
]

interface IProps {
	fetchData: (filter?: string | undefined) => Promise<void>
}

export default function ServersDialog({ fetchData }: IProps) {
	const [open, setOpen] = React.useState(false)
	const [servers, setServers] = React.useState<IServer[]>()
	const [currentServerID, setCurrentServerID] = React.useState<string>()
	const currentServer = () =>
		servers?.find((server) => server.id === currentServerID)
	const [currentEditing, setCurrentEditing] = React.useState<{
		server: IServer
		editing: boolean
	} | null>(null)

	React.useEffect(() => {
		const savedServers = jsonParse(
			localStorage.getItem('logs.servers'),
			undefined,
			defaultServer
		)
		setServers(savedServers)
		const currentServerName = new URLSearchParams(window.location.search).get(
			'server'
		)
		const selectedServer = savedServers.find(
			(server: IServer) => server.name === currentServerName
		)
		if (currentServerName && selectedServer) {
			setCurrentServerID(selectedServer.id)
		} else {
			setCurrentServerID(
				localStorage.getItem('logs.servers.current') || defaultServer[0].id
			)
		}
	}, [])

	React.useEffect(() => {
		if (servers) localStorage.setItem('logs.servers', JSON.stringify(servers))
		if (currentServerID)
			localStorage.setItem('logs.servers.current', currentServerID)
	}, [servers, currentServerID])

	const handleOK = () => {
		setOpen(false)
		fetchData()
	}

	const handleServerAdd = () => {
		const newServer = {
			id: uuidv4(),
			name: '',
			url: '',
			username: '',
			password: ''
		}

		setCurrentEditing({ server: newServer, editing: false })
	}

	const handleChangeCurrentServer = (server: IServer) => {
		setCurrentServerID(server.id)
	}

	const handleServerCopyLink = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		server: IServer
	) => {
		e.stopPropagation()
		const url = new URL(window.location.href)
		const urlParams = new URLSearchParams(window.location.search)
		urlParams.set('server', server.name)
		url.search = urlParams.toString()
		navigator.clipboard.writeText(url.toString())
	}

	const handleServerEdit = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		server: IServer
	) => {
		e.stopPropagation()
		setCurrentEditing({ server, editing: true })
	}

	const handleServerRemove = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		server: IServer
	) => {
		e.stopPropagation()
		if (confirm(`Remover o servidor "${server.name}"?`)) {
			setServers(servers?.filter((s) => s.id !== server.id))
		}
	}

	const handleServerEditDone = ({ server, editing, cancelled }: IOnDone) => {
		const allServers: IServer[] = servers || []
		const newServer = server || ({} as any)

		setCurrentEditing(null)
		if (cancelled) return
		if (!editing) {
			setServers([...allServers, newServer])
		} else {
			setServers(
				allServers.map((server: IServer) => {
					if (server.id === newServer?.id) return newServer
					return server
				})
			)
		}
	}

	return (
		<>
			<Tooltip title={lang.toolbar.settings} disableFocusListener>
				<IconButton
					aria-label={lang.toolbar.settings}
					onClick={() => setOpen(true)}
				>
					<StorageIcon />
				</IconButton>
			</Tooltip>

			{currentEditing && (
				<ServerEditDialog
					server={currentEditing?.server}
					editing={currentEditing?.editing}
					onDone={handleServerEditDone}
				/>
			)}

			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Configurar servidores de logs</DialogTitle>

				<DialogContent sx={{ minWidth: 280, paddingLeft: 0, paddingRight: 0 }}>
					<List sx={{ paddingTop: 0 }}>
						{servers?.map((server, i) => (
							<ListItem
								key={i}
								disablePadding
								selected={currentServer()?.id === server.id}
								onClick={() => handleChangeCurrentServer(server)}
								secondaryAction={
									<>
										<Tooltip title="Copiar link para acessar os logs deste servidor">
											<IconButton
												onClick={(e) => handleServerCopyLink(e, server)}
											>
												<LinkIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Editar servidor">
											<IconButton onClick={(e) => handleServerEdit(e, server)}>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Remover servidor">
											<IconButton
												onClick={(e) => handleServerRemove(e, server)}
											>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</>
								}
							>
								<ListItemButton style={{ paddingRight: 140 }}>
									<ListItemText primary={server.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>

					<Box textAlign="center">
						<Button onClick={handleServerAdd} startIcon={<AddIcon />}>
							Adicionar servidor
						</Button>
					</Box>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleOK}>OK</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
