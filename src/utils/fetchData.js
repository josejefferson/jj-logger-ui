import axios from 'axios'
import { defaultData, errorData } from '../components/placeholders'
import getConfig from 'next/config'
const { publicRuntimeConfig: config } = getConfig()

// Baixa/atualiza os dados
export default async function fetchData(setData, filter) {
  setData([defaultData])
  const { data } = await axios.get(config.LOGS_DATA_URL || './data', {
    auth: (config.LOGS_DATA_USERNAME && config.LOGS_DATA_PASSWORD ? {
      username: config.LOGS_DATA_USERNAME,
      password: config.LOGS_DATA_PASSWORD
    } : undefined),
    params: {
      q: filter || localStorage.getItem('logs.dbFilter') || '{}'
    }
  }).catch((err) => {
    console.error(err)
    return { data: [errorData] }
  })
  setData(data)
}