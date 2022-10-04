import axios from 'axios'
import { IData, IServer } from 'src/types'
import {
	defaultData,
	errorData,
	notConfigured
} from '../components/placeholders'
import { jsonParse } from './json'

// Baixa/atualiza os dados
export default async function fetchData(
	setData: React.Dispatch<React.SetStateAction<any>>,
	filter?: string
) {
	setData([defaultData])

	const { data } = await getFetchedData(filter).catch((err) => {
		if (err.message === 'Server not configured') {
			return { data: [notConfigured] }
		}
		console.error('Erro ao baixar dados:', err)
		return { data: [errorData] }
	})

	setData(data)
}

export async function getFetchedData(filter?: string, afterDate?: Date) {
	const servers: IServer[] = jsonParse(
		localStorage.getItem('logs.servers'),
		undefined,
		[]
	)
	const urlParams = new URLSearchParams(window.location.search)
	const currentServerName = urlParams.get('server')
	const selectedServer = servers.find(
		(server: IServer) => server.name === currentServerName
	)
	const currentServerID =
		currentServerName && selectedServer
			? selectedServer.id
			: localStorage.getItem('logs.servers.current') || ''
	const currentServer: IServer | undefined = servers.find(
		(server: IServer) => server.id === currentServerID
	)

	if (!currentServer) throw new Error('Server not configured')
	let { type, url, username, password, mongoDB } = currentServer
	if (!url && !mongoDB) throw new Error('Server not configured')
	if (type === 1) {
		url = '/api/mongodb?url=' + encodeURIComponent(mongoDB || '')
	}

	const options = {
		auth: username || password ? { username, password } : undefined,
		params: {
			q: filter || localStorage.getItem('logs.dbFilter') || '{}',
			after: afterDate?.toISOString()
		}
	}

	return axios.get<IData[]>(url, options)
}
