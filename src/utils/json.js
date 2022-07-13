export function downloadJSON(data) {
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

export async function uploadJSON(setData) {
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
      if (!Array.isArray(jsonContent)) throw new Error('JSON content is not an Array')
      setData(jsonContent)
    } catch {
      alert('O conteúdo do arquivo é inválido')
    }
  } catch { }
}