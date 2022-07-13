import axios from 'axios'
import { defaultData, errorData } from '../components/placeholders'

// Baixa/atualiza os dados
export default async function fetchData(setData, filter) {
  setData([defaultData])
  const { data } = await axios.get('./data', {
    params: {
      q: filter || localStorage.getItem('logs.dbFilter') || '{}'
    }
  }).catch((err) => {
    console.error(err)
    return { data: [errorData] }
  })
  setData(data)
}