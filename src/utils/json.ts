export function jsonParse(
	text: any,
	reviver?: (this: any, key: string, value: any) => any,
	defaultValue: any = {},
	noDefaultValue: boolean = false
) {
	if (noDefaultValue) defaultValue = undefined
	if (typeof text === 'object' && text !== null) {
		return text || defaultValue
	} else {
		try {
			return JSON.parse(text, reviver) || defaultValue
		} catch {
			return defaultValue
		}
	}
}

export function downloadJSON(data: any) {
	const json = JSON.stringify(data)
	const blob = new Blob([json], { type: 'octet/stream' })
	const url = URL.createObjectURL(blob)
	const $a = document.createElement('a')
	document.body.appendChild($a)
	$a.style.display = 'none'
	$a.href = url
	$a.download = `logs-${new Date().toISOString()}.json`
	$a.click()
	URL.revokeObjectURL(url)
}

export async function uploadJSON(
	setData: React.Dispatch<React.SetStateAction<any>>
) {
	const pickerOpts = {
		types: [
			{
				description: 'JSON',
				accept: {
					'application/json': ['.json']
				}
			}
		],
		multiple: false
	}

	try {
		const [fileHandle] = await window.showOpenFilePicker(pickerOpts)
		const fileData = await fileHandle.getFile()
		const data = await fileData.text()
		try {
			const jsonContent = JSON.parse(data)
			if (!Array.isArray(jsonContent))
				throw new Error('JSON content is not an Array')
			setData(jsonContent)
		} catch {
			alert('O conteúdo do arquivo é inválido')
		}
	} catch {}
}
