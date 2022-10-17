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
import { jsonParse } from '../../utils/json'
import lang from '../../utils/lang'
import ImportExportDialog from './import-export-dialog'
import ServerEditDialog, { IOnDone } from './server-edit-dialog'

const defaultServer: IServer[] = [
	{
		id: uuidv4(),
		type: 0,
		name: '(Servidor padrão)',
		url: '',
		username: '',
		password: '',
		mongoDB: '',
		mongoDBCollection: ''
	}
]

interface IProps {
	fetchData: (filter?: string | undefined) => Promise<void>
}

interface ICurrentEditingServer {
	server: IServer
	editing: boolean
}

export default function ServersDialog({ fetchData }: IProps) {
	const [open, setOpen] = React.useState(false)
	const [impExpDialogOpen, setImpExpDialogOpen] = React.useState(false)
	const [servers, setServers] = React.useState<IServer[]>()
	const [currentServerID, setCurrentServerID] = React.useState<string>()
	const currentServer = () => servers?.find((server) => server.id === currentServerID)
	const [currentEditing, setCurrentEditing] = React.useState<ICurrentEditingServer | null>(null)

	React.useEffect(() => {
		const savedServers = jsonParse(localStorage.getItem('logs.servers'), undefined, defaultServer)
		setServers(savedServers)
		const urlParams = new URLSearchParams(window.location.search)
		const currentServerName = urlParams.get('server')
		const selectedServer = savedServers.find((server: IServer) => server.name === currentServerName)
		if (currentServerName && selectedServer) {
			setCurrentServerID(selectedServer.id)
		} else {
			const currentServerID = localStorage.getItem('logs.servers.current')
			setCurrentServerID(currentServerID || defaultServer[0].id)
			if (!currentServerID) {
				const server = defaultServer[0]
				const openEditor = () => setCurrentEditing({ server, editing: true })
				setOpen(true)
				setTimeout(openEditor, 100)
			}
		}
	}, [])

	React.useEffect(() => {
		if (servers) localStorage.setItem('logs.servers', JSON.stringify(servers))
		if (currentServerID) localStorage.setItem('logs.servers.current', currentServerID)
	}, [servers, currentServerID])

	const handleOK = () => {
		setOpen(false)
		fetchData()
	}

	const handleServerAdd = () => {
		const newServer = {
			id: uuidv4(),
			type: 0 as 0,
			name: '',
			url: '',
			username: '',
			password: '',
			mongoDB: '',
			mongoDBCollection: ''
		}

		setCurrentEditing({ server: newServer, editing: false })
	}

	const handleChangeCurrentServer = (server: IServer) => {
		const url = new URL(location.href)
		if (url.searchParams.get('server')) {
			url.searchParams.set('server', server.name)
			const path = (url.pathname || '') + (url.search || '') + (url.hash || '')
			history?.replaceState?.(undefined, '', path)
		}
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

	const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setImpExpDialogOpen(true)
	}

	return (
		<>
			<Tooltip title={lang.toolbar.settings} disableFocusListener>
				<IconButton
					aria-label={lang.toolbar.settings}
					onClick={() => setOpen(true)}
					onContextMenu={handleContextMenu}
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

			<Dialog open={open} onClose={() => setOpen(false)} scroll="body">
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
											<IconButton onClick={(e) => handleServerCopyLink(e, server)}>
												<LinkIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Editar servidor">
											<IconButton onClick={(e) => handleServerEdit(e, server)}>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Remover servidor">
											<IconButton onClick={(e) => handleServerRemove(e, server)}>
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

			{/* Importar e exportar servidores */}
			<ImportExportDialog open={impExpDialogOpen} setOpen={setImpExpDialogOpen} />
		</>
	)
}
