
import express from 'express';
const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!  ')
})

app.get('/dinos', (req, res) => {
  res.send('Get Some dinosaurs!')
})

app.post('/dinos', (req, res) => {
  res.send('Some dinosaurs have been creaed!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

