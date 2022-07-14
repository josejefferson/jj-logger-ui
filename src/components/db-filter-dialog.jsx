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
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import lang from '../utils/lang'

export default function DBFilterDialog({ fetchData }) {
  const [open, setOpen] = React.useState(false)
  const [filter, setFilter] = React.useState()
  const [saveSnackbar, setSaveSnackbar] = React.useState(false)

  React.useEffect(() => {
    setFilter(localStorage.getItem('logs.dbFilter') || '{}')
  }, [])

  const handleOK = () => {
    setOpen(false)
    fetchData(filter)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const validateFilter = () => {
    try {
      const result = JSON.parse(filter)
      return typeof result === 'object'
    } catch {
      return false
    }
  }

  const handleReset = () => {
    const defaultFilter = localStorage.getItem('logs.dbFilter')
    setFilter(defaultFilter || '{}')
  }

  const handleSave = () => {
    if (!validateFilter()) return
    localStorage.setItem('logs.dbFilter', filter)
    setSaveSnackbar(true)
  }

  const handleClear = () => {
    setFilter('{}')
  }

  return (
    <>
      <Tooltip title={lang.toolbar.dbFilter} disableFocusListener>
        <IconButton aria-label={lang.toolbar.dbFilter} onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{lang.dbFilter.dialogTitle}</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            error={!validateFilter()}
            fullWidth
            helperText={!validateFilter() && 'JSON inválido'}
            InputProps={{ style: { fontFamily: 'monospace' } }}
            label={lang.dbFilter.dialogTextFieldLabel}
            margin="dense"
            multiline
            onChange={(e) => setFilter(e.target.value)}
            rows={4}
            sx={{ mb: 2 }}
            value={filter}
            variant="filled"
          />

          <Button fullWidth onClick={handleReset} startIcon={<PublishedWithChangesIcon />}>{lang.dbFilter.dialogReset}</Button>
          <Button fullWidth onClick={handleSave} startIcon={<TaskAltIcon />} disabled={!validateFilter()}>{lang.dbFilter.dialogSave}</Button>
          <Button fullWidth onClick={handleClear} startIcon={<RestartAltIcon />}>{lang.dbFilter.dialogClear}</Button>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancel}>{lang.dbFilter.dialogButtonCancel}</Button>
          <Button onClick={handleOK} disabled={!validateFilter()}>{lang.dbFilter.dialogButtonOK}</Button>
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