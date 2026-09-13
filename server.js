import express from 'express'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = express()
const port = process.env.PORT || 3000
const currentDir = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.static(path.join(currentDir, 'dist')))

app.post('/api/contact', (request, response) => {
  const { name, email, message } = request.body
  if (!name || !email || !message) {
    return response.status(400).json({ error: 'Les champs nom, email et message sont requis.' })
  }
  return response.status(202).json({ message: 'Votre demande a bien été reçue.' })
})

app.get(/.*/, (_request, response) => response.sendFile(path.join(currentDir, 'dist', 'index.html')))

app.listen(port, () => {
  console.log(`J@mbAR_Xarala est disponible sur http://localhost:${port}`)
})