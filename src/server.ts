import express from 'express';

const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send({title: 'Hello World!'})
})

app.get('/dinos', (req, res) => {
  res.send([
    {id: 0, name: 'Triceratops'},
    {id: 1, name: 'Stegosaurs'},
    {id: 2, name: 'Velociraptor'}
  ])
})

app.post('/dinos', (req, res) => {
  res.send('Some dinosaurs have been created!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//для запуска tsc локально - npx tsc
