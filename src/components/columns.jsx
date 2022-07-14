import React from 'react'
import { ObjectInspector, chromeDark } from 'react-inspector'
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { customDateFilter } from './custom-filters'
import Pill from './Pill'
import Color from './Color'

export const columns = (data) => ([
  {
    label: 'Tempo',
    name: 'date',
    options: {
      filterType: 'custom',
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customBodyRender: (value) => {
        if (isNaN(Number(new Date(value)))) return value
        return new Date(value).toLocaleString()
      },
      customFilterListOptions: customDateFilter.customFilterListOptions,
      filterOptions: customDateFilter.filterOptions
    }
  },

  {
    label: 'Nível',
    name: 'level',
    filterList: ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING'],
    options: {
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customBodyRender: (value) => {
        if (value === undefined) return <></>
        return <Pill level={value}>{value}</Pill>
      }
    }
  },

  {
    label: 'Título',
    name: 'title',
    options: {
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customHeadLabelRender: (columnMeta) => (
        <div style={{ whiteSpace: 'nowrap' }}>{columnMeta.label}</div>
      )
    }
  },

  {
    label: 'Código',
    name: 'code'
  },

  {
    label: 'Info',
    name: 'info',
    options: {
      filter: false,
      display: false,
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customBodyRenderLite: (dataIndex, rowIndex) => {
        if (React.isValidElement(data[dataIndex]?.info)) return data[dataIndex].info
        const hideProduction = data[dataIndex]?.hideProduction
        const hideConsole = data[dataIndex]?.hideConsole

        return (
          <>
            <span title="Mostrado no modo de produção" hidden={hideProduction}>
              <ArticleOutlinedIcon />
            </span>
            <span title="Oculto do console" hidden={!hideConsole}>
              <SpeakerNotesOffIcon style={{ marginLeft: '4px' }} />
            </span>
          </>
        )
      }
    }
  },

  {
    label: 'Cor',
    name: 'color',
    options: {
      setCellProps: () => ({ style: { padding: '0' } }),
      customBodyRenderLite: (dataIndex, rowIndex) => {
        if (React.isValidElement(data[dataIndex]?.info)) return data[dataIndex].info
        const color = data[dataIndex]?.color
        return <Color color={color} />
      }
    }
  },

  {
    label: 'Conteúdo',
    name: 'contents',
    options: {
      filterType: 'textField',
      customBodyRender: (value) => {
        if (value === undefined) return <></>
        if (!Array.isArray(value)) return value

        return value.map((content, i) => {
          if (typeof content === 'object') return (
            <span className="content-cell-object">
              <ObjectInspector key={i}
                data={content}
                // @ts-ignore
                theme={{
                  ...chromeDark,
                  ...({ BASE_BACKGROUND_COLOR: 'transparent' })
                }}
              />
            </span>
          )

          return (
            <span className="content-cell-text" title={content} key={i}>
              {content}
            </span>
          )
        })
      }
    }
  },

  {
    label: 'Detalhes',
    name: 'details',
    sort: false,
    options: {
      setCellProps: () => ({ className: 'details-cell' }),
      filterType: 'textField',
      filterOptions: {
        names: [],
        logic(value, filters, row) {
          try { value = JSON.stringify(value) } catch { }
          return !(value ?? '').toString().includes(filters[0])
        }
      },
      customBodyRenderLite: (dataIndex, rowIndex) => {
        const value = data[dataIndex]?.details
        if (value === undefined) return <></>
        if (React.isValidElement(value)) return value
        return (
          <ObjectInspector
            data={value}
            // @ts-ignore
            theme={{
              ...chromeDark,
              ...({ BASE_BACKGROUND_COLOR: 'transparent' })
            }}
          />
        )
      }
    }
  }
])