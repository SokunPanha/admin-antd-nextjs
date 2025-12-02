// js下载文件
export function downloadFile(data: Blob, fileName: string) {
  const a = document.createElement('a')
  const url = window.URL.createObjectURL(data)
  a.href = url
  a.download = fileName
  a.click()
  window.URL.revokeObjectURL(url)
}

// download image from canvas
export function downloadCanvas(canvas: HTMLCanvasElement, fileName: string) {
  const data = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = data
  a.download = fileName
  a.click()
}
