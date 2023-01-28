import LinearProgress from '@mui/material/LinearProgress'

// Dados em carregamento
export const defaultData = {
	_id: <LinearProgress />,
	date: <LinearProgress />,
	level: <LinearProgress />,
	title: <LinearProgress />,
	code: <LinearProgress />,
	tags: <LinearProgress />,
	info: <LinearProgress />,
	color: <LinearProgress />,
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
