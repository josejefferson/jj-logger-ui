import React from 'react'
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
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import LinkIcon from '@mui/icons-material/Link'
import StorageIcon from '@mui/icons-material/Storage'
import ServerEditDialog from './server-edit-dialog'
import { v4 as uuidv4 } from 'uuid'
import lang from '../utils/lang'
import { jsonParse } from '../utils/json'

const defaultServer = [{
  id: uuidv4(),
  name: '(Servidor padrão)',
  url: './data',
  username: '',
  password: ''
}]

export default function SettingsDialog({ fetchData }) {
  const [open, setOpen] = React.useState(false)
  const [servers, setServers] = React.useState()
  const [currentServerID, setCurrentServerID] = React.useState()
  const currentServer = () => servers.find(server => server.id === currentServerID)
  const [currentEditing, setCurrentEditing] = React.useState(null)

  React.useEffect(() => {
    const savedServers = jsonParse(localStorage.getItem('logs.servers'), null, defaultServer)
    setServers(savedServers)
    const currentServerName = new URLSearchParams(window.location.search).get('server')
    const selectedServer = savedServers.find(server => server.name === currentServerName)
    if (currentServerName && selectedServer) {
      setCurrentServerID(selectedServer.id)
    } else {
      setCurrentServerID(localStorage.getItem('logs.servers.current') || defaultServer[0].id)
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
      name: '',
      url: '',
      username: '',
      password: ''
    }

    setCurrentEditing({ server: newServer, editing: false })
  }

  const handleChangeCurrentServer = (server) => {
    setCurrentServerID(server.id)
  }

  const handleServerCopyLink = (e, server) => {
    e.stopPropagation()
    const url = new URL(window.location)
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('server', server.name)
    url.search = urlParams.toString()
    navigator.clipboard.writeText(url.toString())
  }

  const handleServerEdit = (e, server) => {
    e.stopPropagation()
    setCurrentEditing({ server, editing: true })
  }

  const handleServerRemove = (e, server) => {
    e.stopPropagation()
    if (confirm(`Remover o servidor "${server.name}"?`)) {
      setServers(servers.filter(s => s.id !== server.id))
    }
  }

  const handleServerEditDone = ({ server: newServer, editing, cancelled }) => {
    setCurrentEditing(null)
    if (cancelled) return
    if (!editing) {
      setServers([...servers, newServer])
    } else {
      setServers(servers.map((server) => {
        if (server.id === newServer.id) return newServer
        return server
      }))
    }
  }

  return (
    <>
      <Tooltip title={lang.toolbar.settings} disableFocusListener>
        <IconButton aria-label={lang.toolbar.settings} onClick={() => setOpen(true)}>
          <StorageIcon />
        </IconButton>
      </Tooltip>

      {currentEditing &&
        <ServerEditDialog
          server={currentEditing?.server}
          editing={currentEditing?.editing}
          onDone={handleServerEditDone}
        />
      }

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
                secondaryAction={<>
                  <Tooltip title="Copiar link para acessar os logs deste servidor">
                    <IconButton onClick={(e) => handleServerCopyLink(e, server)}><LinkIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Editar servidor">
                    <IconButton onClick={(e) => handleServerEdit(e, server)}><EditIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Remover servidor">
                    <IconButton onClick={(e) => handleServerRemove(e, server)}><DeleteIcon /></IconButton>
                  </Tooltip>
                </>}
              >
                <ListItemButton>
                  <ListItemText primary={server.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box textAlign="center">
            <Button margin="auto" onClick={handleServerAdd} startIcon={<AddIcon />}>Adicionar servidor</Button>
          </Box>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}