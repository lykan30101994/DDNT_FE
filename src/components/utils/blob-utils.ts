export const BlobUtils = {
  downloadFile: (data: BlobPart[], options?: BlobPropertyBag) => {
    const blob = new Blob(data, options)
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'data.xlsx'
    link.click()
  }
}
