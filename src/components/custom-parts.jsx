import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import DataObjectIcon from '@mui/icons-material/DataObject'
import HeightIcon from '@mui/icons-material/Height'
import RefreshIcon from '@mui/icons-material/Refresh'
import DBFilterDialog from './db-filter-dialog'
import ServersDialog from './servers-dialog'
import { downloadJSON, uploadJSON } from '../utils/json'
import lang from '../utils/lang'

// Adiciona mais botões na barra de ferramentas
export const Toolbar = ({
  setResizableColumns,
  resizableColumns,
  data,
  setData,
  fetchData,
  filter,
  setFilter
}) => () => {
  return (
    <>
      {/* Botão de redimensionar colunas */}
      <Tooltip title={lang.toolbar.adjustColumnWidth} disableFocusListener>
        <span className="resize-columns-btn">
          <IconButton aria-label={lang.toolbar.adjustColumnWidth} onClick={() => setResizableColumns(!resizableColumns)}>
            <HeightIcon style={{ transform: 'rotate(90deg)' }} />
          </IconButton>
        </span>
      </Tooltip>

      {/* Botão de exportar para JSON */}
      <Tooltip title={lang.toolbar.downloadJson} disableFocusListener>
        <IconButton aria-label={lang.toolbar.downloadJson} onClick={() => downloadJSON(data)}>
          <DataObjectIcon />
        </IconButton>
      </Tooltip>

      {/* Botão de importar logs de arquivo JSON */}
      <Tooltip title={lang.toolbar.uploadJson} disableFocusListener>
        <IconButton aria-label={lang.toolbar.uploadJson} onClick={() => uploadJSON(setData)}>
          <CloudUploadIcon />
        </IconButton>
      </Tooltip>

      {/* Botão de filtrar pelo banco de dados */}
      <DBFilterDialog fetchData={(filter) => fetchData(setData, filter)} filter={filter} setFilter={setFilter} />

      {/* Botão de configurar os servidores */}
      <ServersDialog fetchData={(filter) => fetchData(setData, filter)} />

      {/* Botão de atualizar dados */}
      <Tooltip title={lang.toolbar.refresh} disableFocusListener>
        <IconButton aria-label={lang.toolbar.refresh} onClick={() => fetchData(setData, filter)}>
          <RefreshIcon />
        </IconButton>
      </Tooltip>
    </>
  )
}

export const FilterDialogFooter = (currentFilterList, applyNewFilters) => {
  return (
    <div style={{ marginTop: '40px' }}>
      <Button variant="contained" onClick={applyNewFilters}>{lang.filter.apply}</Button>
    </div>
  )
}