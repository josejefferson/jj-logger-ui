import axios from 'axios'
import { IData, IServer } from 'src/types'
import { defaultData, errorData, notConfigured } from '../components/placeholders'
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
	const servers: IServer[] = jsonParse(localStorage.getItem('logs.servers'), undefined, [])
	const urlParams = new URLSearchParams(window.location.search)
	const currentServerName = urlParams.get('server')

	if (urlParams.get('useFrameParentData')) {
		return getIFrameData(filter, afterDate)
	}

	const selectedServer = servers.find((server: IServer) => server.name === currentServerName)
	const currentServerID =
		currentServerName && selectedServer
			? selectedServer.id
			: localStorage.getItem('logs.servers.current') || ''
	const currentServer: IServer | undefined = servers.find(
		(server: IServer) => server.id === currentServerID
	)

	if (!currentServer) throw new Error('Server not configured')
	let { type, url, username, password, mongoDB, mongoDBCollection } = currentServer
	if (!url && !mongoDB) throw new Error('Server not configured')
	if (type === 1) {
		url = '/api/mongodb?url=' + encodeURIComponent(mongoDB || '')
		if (mongoDBCollection) url += '&collection=' + encodeURIComponent(mongoDBCollection || '')
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

export async function getIFrameData(filter?: string, afterDate?: Date): Promise<any> {
	if (window.self !== window.top) {
		parent.postMessage(['fetch', { filter, afterDate }], '*')

		const { data }: MessageEvent = await new Promise((resolve) => {
			window.addEventListener('message', resolve, { once: true })
		})

		if (!Array.isArray(data)) throw new Error('Invalid data')
		const [command, content] = data
		if (command !== 'logs') throw new Error(`Invalid command "${command}"`)
		return { data: content }
	} else {
		throw new Error('This is not an iframe')
	}
}
