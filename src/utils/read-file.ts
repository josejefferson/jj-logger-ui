import { IServer } from 'src/types'
import { jsonParse } from './json'

export default function readFile(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsText(file, 'UTF-8')
		reader.addEventListener('load', (e) => {
			const text = e.target!.result || ''
			if (typeof text !== 'string') {
				reject(new Error('O conteúdo é binário'))
			}

			const json = jsonParse(text, undefined, undefined, true)
			if (json === undefined) {
				reject(new Error('O conteúdo não está no formato JSON'))
			}

			if (!Array.isArray(json)) {
				reject(new Error('O conteúdo não é deste site'))
			}

			resolve(json as IServer[])
		})

		reader.addEventListener('error', () => {
			reject(new Error('Erro desconhecido'))
		})
	})
}
