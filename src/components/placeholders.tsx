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
	color: 'redBright',
	contents: <span>Ocorreu um erro ao baixar os logs</span>,
	details: <span>Confira as configurações do servidor ou atualize para tentar novamente</span>
}

// Sem configuração
export const notConfigured = {
	date: <span>-</span>,
	level: 'ERROR',
	title: <span>Erro</span>,
	color: 'yellowBright',
	contents: <span>Servidor não configurado</span>,
	details: <span>Confira as configurações do servidor</span>
}
