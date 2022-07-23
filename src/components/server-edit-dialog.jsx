import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'

export default function ServerEditDialog({ server, editing = false, onDone = () => { } }) {
  const [serverName, setServerName] = React.useState(server?.name)
  const [serverURL, setServerURL] = React.useState(server?.url)
  const [serverUsername, setServerUsername] = React.useState(server?.username)
  const [serverPassword, setServerPassword] = React.useState(server?.password)

  const handleOK = () => {
    onDone({
      cancelled: false,
      editing: editing,
      server: {
        id: server?.id,
        name: serverName,
        url: serverURL,
        username: serverUsername,
        password: serverPassword
      }
    })
  }

  const handleCancel = () => {
    onDone({ cancelled: true })
  }

  return (
    <>
      <Dialog open={!!server} onClose={handleCancel}>
        <DialogTitle>{editing ? 'Editar' : 'Adicionar'} servidor</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Nome do servidor"
            margin="dense"
            onChange={(e) => setServerName(e.target.value)}
            sx={{ mb: 2 }}
            value={serverName}
          />

          <TextField
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
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleOK}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}