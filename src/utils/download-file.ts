import { IServer } from 'src/types'

export default function downloadFile(servers: IServer[]) {
	const blob = new Blob([JSON.stringify(servers)], {
		type: 'application/json'
	})
	const $anchor = window.document.createElement('a')
	$anchor.href = URL.createObjectURL(blob)
	$anchor.download = 'JJLogger-Servers-' + new Date().toISOString() + '.json'
	document.body.appendChild($anchor)
	$anchor.click()
	document.body.removeChild($anchor)
}
