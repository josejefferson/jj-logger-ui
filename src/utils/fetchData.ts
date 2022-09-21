import axios from 'axios'
import { IServer } from 'src/types'
import { defaultData, errorData } from '../components/placeholders'
import { jsonParse } from './json'

// Baixa/atualiza os dados
export default async function fetchData(
	setData: React.Dispatch<React.SetStateAction<any>>,
	filter?: string
) {
	setData([defaultData])

	const servers = jsonParse(localStorage.getItem('logs.servers'), undefined, [])
	const currentServerName = new URLSearchParams(window.location.search).get(
		'server'
	)
	const selectedServer = servers.find(
		(server: IServer) => server.name === currentServerName
	)
	const currentServerID =
		currentServerName && selectedServer
			? selectedServer.id
			: localStorage.getItem('logs.servers.current') || ''
	const currentServer =
		servers.find((server: IServer) => server.id === currentServerID) || {}
	const { url, username, password } = currentServer

	const { data } = await axios
		.get(url || './data', {
			auth: username || password ? { username, password } : undefined,
			params: {
				q: filter || localStorage.getItem('logs.dbFilter') || '{}'
			}
		})
		.catch((err) => {
			console.error(err)
			return { data: [errorData] }
		})

	setData(data)
}
