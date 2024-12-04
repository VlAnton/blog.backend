import fs from 'fs'

export const saveImage = async (photo: any, res: any) => {
  await fs.readFile(photo.filepath, async (err, buffer) => {
    if (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end('Error reading file data');
      return;
    }
    const dirnameArr = __dirname.split('/')
    const newDir = dirnameArr.slice(0, dirnameArr.length - 2).join('/')
    const photoPath = `${newDir}/uploads/${photo.originalFilename}`
    await fs.appendFile(photoPath, buffer, (err) => {
      console.log(err)
    })
    fs.unlink(photo.filepath, (err) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/plain' });
        res.end('Error deleting temporary file');
        return;
      }
    });
  })
}
