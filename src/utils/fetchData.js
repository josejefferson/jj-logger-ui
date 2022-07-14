import axios from 'axios'
import { defaultData, errorData } from '../components/placeholders'

// Baixa/atualiza os dados
export default async function fetchData(setData, filter) {
  setData([defaultData])
  const url = localStorage.getItem('logs.settings.serverURL')
  const username = localStorage.getItem('logs.settings.serverUsername')
  const password = localStorage.getItem('logs.settings.serverPassword')

  const { data } = await axios.get(url || './data', {
    auth: (username && password ? { username, password } : undefined),
    params: {
      q: filter || localStorage.getItem('logs.dbFilter') || '{}'
    }
  }).catch((err) => {
    console.error(err)
    return { data: [errorData] }
  })
  setData(data)
}

