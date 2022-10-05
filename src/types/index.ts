export interface IServer {
	id: string
	type: 0 | 1
	name: string
	url: string
	username: string
	password: string
	mongoDB?: string
	mongoDBCollection?: string
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
