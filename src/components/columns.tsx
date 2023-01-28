import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { MUIDataTableColumnDef } from 'mui-datatables'
import React from 'react'
import { chromeDark, chromeLight, ObjectInspector } from 'react-inspector'
import { IData } from 'src/types'
import Color from './color'
import { customDateFilter } from './custom-filters'
import Pill from './pill'

dayjs.locale('pt-br')
dayjs.extend(relativeTime)

const lightTheme =
	typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('lightTheme')
const chromeTheme = lightTheme ? chromeLight : chromeDark

export const columns = (data: IData[]): MUIDataTableColumnDef[] => [
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
						<div>
							<small>{dayjs(value).fromNow()}</small>
						</div>
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
		options: {
			filterOptions: {
				names: ['SUCCESS', 'ERROR', 'DEBUG', 'INFO', 'WARNING']
			},
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
		label: 'Tags',
		name: 'tags',
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
			setCellProps: () => ({ style: { minWidth: '300px' } }),
			filterType: 'textField',
			customBodyRender: (value) => {
				if (value === undefined) return <></>
				if (!Array.isArray(value)) return value

				return value.map((content, i) => {
					if (typeof content === 'object')
						return (
							<span className="content-cell-object">
								<ObjectInspector
									key={i}
									data={content}
									// @ts-ignore
									theme={{
										...chromeTheme,
										...{ BASE_BACKGROUND_COLOR: 'transparent' }
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
		options: {
			sort: false,
			setCellProps: () => ({
				className: 'details-cell',
				style: { minWidth: '300px' }
			}),
			filterType: 'textField',
			filterOptions: {
				names: [],
				logic(value, filters) {
					try {
						value = JSON.stringify(value)
					} catch {}
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
							...chromeTheme,
							...{ BASE_BACKGROUND_COLOR: 'transparent' }
						}}
					/>
				)
			}
		}
	}
]
