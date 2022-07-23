import React from 'react'
import Head from 'next/head'
import MUIDataTable from 'mui-datatables'
import { ThemeProvider } from '@mui/material/styles'
import defaultMaterialTheme from '../utils/theme'
import lang from '../utils/lang'
import { jsonParse } from '../utils/json'
import fetchData from '../utils/fetchData'
import { columns } from '../components/columns'
import { defaultData } from '../components/placeholders'
import { Toolbar, FilterDialogFooter } from '../components/custom-parts'

const Logs = () => {
  const [data, setData] = React.useState([defaultData])
  const [resizableColumns, setResizableColumns] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(50)
  const [filter, setFilter] = React.useState()

  React.useEffect(() => {
    setFilter(localStorage.getItem('logs.dbFilter') || '{}')
  }, [])

  // Baixa os dados
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => { fetchData(setData, filter) }, [filter])

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
  const options = {
    confirmFilters: true,
    customFilterDialogFooter: FilterDialogFooter,
    customToolbar,
    download: false,
    filterType: 'multiselect',
    fixedHeader: true,
    print: false,
    resizableColumns: resizableColumns,
    onChangeRowsPerPage: (n) => setRowsPerPage(n),
    rowsPerPage,
    rowsPerPageOptions: [10, 50, 100, 200, 500, 1000],
    selectableRows: 'none',
    sortOrder: { name: 'date', direction: 'desc' },
    tableBodyHeight: 'calc(100vh - 64px - 53px)',
    textLabels: lang
  }

  let currentServerName = React.useRef('')
  React.useEffect(() => {
    const servers = jsonParse(localStorage.getItem('logs.servers'), null, [])
    const currentServerID = localStorage.getItem('logs.servers.current') || ''
    const currentServer = servers.find(server => server.id === currentServerID) || {}
    console.log(currentServer)
    currentServerName.current = (!currentServer.name || currentServer.name === '(Servidor padrão)') ? '' : ` - ${currentServer.name}`
  })

  return (
    <>
      <Head>
        <title>{'Logs' + currentServerName.current}</title>
      </Head>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MUIDataTable
          title={'Logs' + currentServerName.current}
          className="no-border-radius"
          data={data}
          columns={columns(data)}
          options={options}
        />
      </ThemeProvider>
    </>
  )
}

export default Logs