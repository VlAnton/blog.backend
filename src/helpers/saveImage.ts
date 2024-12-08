import fs from 'fs'

export const getNewFilePath = (originalName: string | null) => {
  if (!originalName) {
    return originalName
  }
  const dirnameArr = __dirname.split('/')
  const filename = originalName.substring(0, originalName.lastIndexOf('.'))
  const filetype = originalName.substring(originalName.lastIndexOf('.') + 1, originalName.length)
  const newDir = `${dirnameArr.slice(0, dirnameArr.length - 2).join('/')}/uploads`
  const photoPath = `${newDir}/${filename}.${filetype}`
  let i = 0
  let newPhotoPath = photoPath

  while (fs.existsSync(newPhotoPath)) {
    i++
    newPhotoPath = `${newDir}/${filename}(${i}).${filetype}`
  }

  return newPhotoPath
}

export const saveImage = async (photo: any, res: any) => {
  await fs.readFile(photo.filepath, async (err, buffer) => {
    let error
    if (err) {
      error = err
    }
    const newPhotoPath = getNewFilePath(photo.originalFilename)

    await fs.appendFile(newPhotoPath!, buffer, (err) => {
      if (err) {
        error = err
      }
    })
    fs.unlink(photo.filepath, (err) => {
      if (err) {
        error = err
      }
    })
    if (error) {
      console.log(error)
      res.writeHead(500, { 'content-type': 'text/plain' })
      res.end('Error while loading image', error)
      return
    }
  })
}
