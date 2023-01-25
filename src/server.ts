import express from 'express';
import { db } from '../data/dino-db';

const app = express()
const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send({title: 'Hello World!'})
})

app.get('/dinos', (req, res) => {
  res.json(db.dinosaurs)
  //res.send(dinos)
  //res.json({title: "title"}) // если хотим определить content-type: application/json
  // res.sendStatus(400) // отправляем код ответа
})
app.get('/dinos/:id', (req, res) => {
  let foundedDino = db.dinosaurs.find(d=>d.id === +req.params.id)
  if(foundedDino) {
   res.json(foundedDino)
  } else {
    res.sendStatus(404)
  }
})

app.post('/dinos', (req, res) => {
  res.send('Some dinosaurs have been created!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

//для запуска tsc локально - npx tsc
