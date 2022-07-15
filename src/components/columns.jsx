import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import { ObjectInspector, chromeDark } from 'react-inspector'
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { customDateFilter } from './custom-filters'
import Pill from './Pill'
import Color from './Color'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

export const columns = (data) => ([
  {
    label: 'ID',
    name: '_id',
    options: {
      display: false,
      filterType: 'textField',
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } })
    }
  },

  {
    label: 'Tempo',
    name: 'date',
    options: {
      filterType: 'custom',
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customBodyRenderLite: (dataIndex) => {
        const value = data[dataIndex]?.date
        if (isNaN(Number(new Date(value)))) return value

        return (
          <small>
            <div>{dayjs(value).format('HH:mm:ss DD/MM/YY')}</div>
            <div><small>{dayjs(value).fromNow()}</small></div>
          </small>
        )
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
    name: 'code',
    options: {
      display: false
    }
  },

  {
    label: 'Info',
    name: 'info',
    options: {
      filter: false,
      display: false,
      setCellProps: () => ({ style: { whiteSpace: 'nowrap' } }),
      customBodyRenderLite: (dataIndex) => {
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
      customBodyRenderLite: (dataIndex) => {
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
        logic(value, filters) {
          try { value = JSON.stringify(value) } catch { }
          return !(value ?? '').toString().includes(filters[0])
        }
      },
      customBodyRenderLite: (dataIndex) => {
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