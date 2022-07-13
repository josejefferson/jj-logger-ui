import LinearProgress from '@mui/material/LinearProgress'

// Dados em carregamento
export const defaultData = {
  date: <LinearProgress />,
  level: <LinearProgress />,
  info: <LinearProgress />,
  title: <LinearProgress />,
  code: <LinearProgress />,
  contents: <LinearProgress />,
  details: <LinearProgress />
}

// Erro
export const errorData = {
  date: <span>-</span>,
  level: 'ERROR',
  title: <span>Erro</span>,
  contents: <span>Ocorreu um erro ao baixar os logs</span>,
  details: <span>Atualize para tentar novamente</span>
}