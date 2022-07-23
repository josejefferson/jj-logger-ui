import axios from 'axios'
import { defaultData, errorData } from '../components/placeholders'
import { jsonParse } from './json'

// Baixa/atualiza os dados
export default async function fetchData(setData, filter) {
  setData([defaultData])

  const servers = jsonParse(localStorage.getItem('logs.servers'), null, [])
  const currentServerName = new URLSearchParams(window.location.search).get('server')
  const selectedServer = servers.find(server => server.name === currentServerName)
  const currentServerID = currentServerName && selectedServer
    ? selectedServer.id
    : localStorage.getItem('logs.servers.current') || ''
  const currentServer = servers.find(server => server.id === currentServerID) || {}
  const { url, username, password } = currentServer

  const { data } = await axios.get(url || './data', {
    auth: (username || password ? { username, password } : undefined),
    params: {
      q: filter || localStorage.getItem('logs.dbFilter') || '{}'
    }
  }).catch((err) => {
    console.error(err)
    return { data: [errorData] }
  })

  setData(data)
}
