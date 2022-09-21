export interface IServer {
	id: string
	name: string
	url: string
	username: string
	password: string
}

export interface IData {
	date?: any
	level?: any
	info?: any
	title?: any
	code?: any
	contents?: any
	details?: any
	color?: any
	hideProduction?: boolean
	hideConsole?: boolean
}
