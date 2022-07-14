import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import SettingsIcon from '@mui/icons-material/Settings'
import lang from '../utils/lang'

export default function SettingsDialog({ fetchData }) {
  const [open, setOpen] = React.useState(false)
  const [saveSnackbar, setSaveSnackbar] = React.useState(false)
  const [serverURL, setServerURL] = React.useState()
  const [serverUsername, setServerUsername] = React.useState()
  const [serverPassword, setServerPassword] = React.useState()

  React.useEffect(() => {
    setServerURL(localStorage.getItem('logs.settings.serverURL') || '')
    setServerUsername(localStorage.getItem('logs.settings.serverUsername') || '')
    setServerPassword(localStorage.getItem('logs.settings.serverPassword') || '')
  }, [])

  const handleOK = () => {
    setOpen(false)
    localStorage.setItem('logs.settings.serverURL', serverURL)
    localStorage.setItem('logs.settings.serverUsername', serverUsername)
    localStorage.setItem('logs.settings.serverPassword', serverPassword)
    if (!serverURL) localStorage.removeItem('logs.settings.serverURL')
    if (!serverUsername) localStorage.removeItem('logs.settings.serverUsername')
    if (!serverPassword) localStorage.removeItem('logs.settings.serverPassword')
    fetchData()
    setSaveSnackbar(true)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <>
      <Tooltip title={lang.toolbar.settings} disableFocusListener>
        <IconButton aria-label={lang.toolbar.settings} onClick={() => setOpen(true)}>
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{lang.settings.dialogTitle}</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label={lang.settings.dialogTextFieldURL}
            margin="dense"
            onChange={(e) => setServerURL(e.target.value)}
            sx={{ mb: 2 }}
            value={serverURL}
          />

          <TextField
            fullWidth
            label={lang.settings.dialogTextFieldUsername}
            margin="none"
            onChange={(e) => setServerUsername(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
            value={serverUsername}
          />

          <TextField
            fullWidth
            label={lang.settings.dialogTextFieldPassword}
            margin="none"
            onChange={(e) => setServerPassword(e.target.value)}
            size="small"
            sx={{ mb: 2 }}
            type="password"
            value={serverPassword}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>{lang.settings.dialogButtonCancel}</Button>
          <Button onClick={handleOK}>{lang.settings.dialogButtonOK}</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={saveSnackbar}
        autoHideDuration={6000}
        onClose={() => setSaveSnackbar(false)}
        message="Configurações do servidor atualizadas"
      />
    </>
  )
}