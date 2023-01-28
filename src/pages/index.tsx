import { ThemeProvider } from '@mui/material/styles'
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables'
import Head from 'next/head'
import React from 'react'
import { IData, IServer } from 'src/types'
import { columns } from '../components/columns'
import { FilterDialogFooter, Toolbar } from '../components/custom-parts'
import { defaultData } from '../components/placeholders'
import fetchData from '../utils/fetch-data'
import { jsonParse } from '../utils/json'
import lang from '../utils/lang'
import defaultMaterialTheme from '../utils/theme'

const Logs = () => {
	const [data, setData] = React.useState<IData[]>([defaultData])
	const [resizableColumns, setResizableColumns] = React.useState(false)
	const [rowsPerPage, setRowsPerPage] = React.useState(50)
	const [filter, setFilter] = React.useState<string>()

	React.useEffect(() => {
		setFilter(localStorage.getItem('logs.dbFilter') || '{}')
	}, [])

	// Baixa os dados
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => {
		fetchData(setData, filter)
	}, [filter])

	// Barra de ferramentas personalizada
	const customToolbar = Toolbar({
		setResizableColumns,
		resizableColumns,
		data,
		setData,
		fetchData,
		filter,
		setFilter
	})

	// Opções do MUIDataTables
	const options: MUIDataTableOptions = {
		confirmFilters: true,
		customFilterDialogFooter: FilterDialogFooter,
		customToolbar,
		download: false,
		filterType: 'multiselect',
		fixedHeader: true,
		print: false,
		resizableColumns: resizableColumns,
		onChangeRowsPerPage: (n: number) => setRowsPerPage(n),
		responsive: 'standard',
		rowsPerPage,
		rowsPerPageOptions: [10, 50, 100, 200, 500, 1000],
		selectableRows: 'none',
		sortOrder: { name: 'date', direction: 'desc' },
		tableBodyHeight: 'calc(100vh - 64px - 53px)',
		textLabels: lang
	}

	let currentServerName = React.useRef('')
	React.useEffect(() => {
		const servers = jsonParse(localStorage.getItem('logs.servers'), undefined, [])
		const currentServerID = localStorage.getItem('logs.servers.current') || ''
		const currentServer = servers.find((server: IServer) => server.id === currentServerID) || {}
		const urlParams = new URLSearchParams(window.location.search)
		if (urlParams.get('useFrameParentData')) {
			currentServerName.current = ''
		} else {
			currentServerName.current =
				!currentServer.name || currentServer.name === '(Servidor padrão)'
					? ''
					: ` - ${currentServer.name}`
		}
	})

	return (
		<>
			<Head>
				<title>{'Logs' + currentServerName.current}</title>
			</Head>
			<ThemeProvider theme={defaultMaterialTheme}>
				<MUIDataTable
					title={'Logs' + currentServerName.current}
					data={data}
					columns={columns(data)}
					options={options}
					// @ts-ignore
					className="no-border-radius"
				/>
			</ThemeProvider>
		</>
	)
}

export default Logs
