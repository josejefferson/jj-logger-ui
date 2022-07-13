import axios from 'axios'
import { defaultData, errorData } from '../components/placeholders'

// Baixa/atualiza os dados
export default async function fetchData(setData, filter) {
  setData([defaultData])
  const { data } = await axios.get('https://ifpbbot.herokuapp.com/status/logs/data', {
    auth: {
      username: 'IFPB',
      password: 'e7a6964bca576a47'
    },
    params: {
      q: filter || localStorage.getItem('logs.dbFilter') || '{}'
    }
  }).catch((err) => {
    console.error(err)
    return { data: [errorData] }
  })
  setData(data)
}