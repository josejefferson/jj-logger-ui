import { createTheme } from '@mui/material/styles'

const lightTheme =
	typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lightTheme')

// CSS personalizados
export default createTheme({
	palette: { mode: lightTheme ? 'light' : 'dark' },
	components: {
		// @ts-ignore
		MUIDataTableBodyCell: {
			styleOverrides: {
				root: {
					padding: '3px 10px',
					wordBreak: 'break-all'
				}
			}
		},
		MUIDataTableHeadCell: {
			styleOverrides: {
				root: {
						padding: '0 16px'
				}
			}
		},
		MUIDataTableToolbar: {
			styleOverrides: {
				root: {
					'@media (max-width: 450px)':{
						minHeight: '48px',
						paddingLeft: '0',
						paddingRight: '16px'
					}
				},
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
				},
				left: {
					paddingTop: 0,
					overflow: 'hidden',
					'@media (max-width: 450px)': {
						width: '100vw !important',
						height: '48px !important',
						alignItems: 'center',
						justifyContent: 'center',
						display: 'flex'
					},
					':has(div > svg + div + button)': {
						paddingLeft: '12px',
						paddingRight: '12px'
					}
				},
				actions: {
					whiteSpace: 'nowrap'
				}
			}
		},
		MUIDataTable: {
			styleOverrides: {
				responsiveBase: {
					'@media (max-width: 450px)': {
						height: 'calc(100vh - 88px - 53px) !important'
					}
				}
			}
		},
		MUIDataTablePagination: {
			styleOverrides: {
				tableCellContainer: {
					'@media (max-width: 450px)': {
						padding: '0'
					}
				}
			}
		},
		MUIDataTableSearch: {
			styleOverrides: {
				searchText: {
					flex: '1'
				}
			}
		}
	}
})
