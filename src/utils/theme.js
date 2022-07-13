import { createTheme } from '@mui/material/styles'

// CSS personalizados
export default createTheme({
  palette: { mode: 'dark' },
  components: {
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          padding: '3px 10px',
          wordBreak: 'break-all'
        }
      }
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        filterPaper: {
          '@media (max-width: 450px)': {
            width: '100vw !important',
            left: '0 !important',
            top: '0 !important',
            maxWidth: '100vw !important'
          },
          '@media (min-width: 451px)': {
            minWidth: '450px !important'
          }
        }
      }
    }
  }
})