import express from "express";
import { db } from "../data/dino-db";

const app = express();
const port = process.env.PORT || 4000;

//middleware - программы, которые выполняются до коллбек-функции (req,res) =>{...}
const jsonParseMiddleware = express.json();
app.use(jsonParseMiddleware);

app.get("/", (req, res) => {
  res.send({ title: "Hello World!" });
});

app.get("/dinos", (req, res) => {
  let dinos = db.dinosaurs;
  if (req.query.name) {
    dinos = dinos.filter(
      (dino) => dino.name.indexOf(req.query.name as string) > -1
    );
  }
  if (req.query.minWeight) {
    dinos = dinos.filter((dino) => {
      if (dino.weight) {
        return dino.weight >= +(req.query.minWeight as string);
      }
      return false;
    });
  }
  if (req.query.maxWeight) {
    dinos = dinos.filter((dino) => {
      if (dino.weight) {
        return dino.weight <= +(req.query.maxWeight as string);
      }
      return false;
    });
  }
  res.json(dinos);
  //res.send(dinos) // слишком универсальный метод
  // res.sendStatus(400) // отправляем код ответа
});

app.get("/dinos/count", (req, res) => {
  res.json({count: db.dinosaurs.length});
});

app.get("/dinos/:id", (req, res) => {
  let foundedDino = db.dinosaurs.find((d) => d.id === +req.params.id);
  if (!foundedDino) {
    res.sendStatus(404);
    return;
  }
  res.json(foundedDino);
});



app.post("/dinos", (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);
    return;
  }
  const newDinosaur = {
    id: db.dinosaurs.length,
    ...req.body,
  };
  /** команда для отправки в консоли 
  fetch("http://localhost:4000/dinos", {
    method: "post",
    body: JSON.stringify({ name: "Another dino", length: 4 }),
    headers: { "content-type": "application/json" },
  }).then(res => res.json()).then(json=>console.log(json));
  */

  db.dinosaurs.push(newDinosaur);
  res.status(201).json(newDinosaur);
});

app.put("/dinos/:id", (req, res) => {
  let foundedDino = db.dinosaurs.find((d) => d.id === +req.params.id);
  if (!foundedDino) {
    res.sendStatus(404);
    return;
  }
  let updatedDino = {
    ...foundedDino,
    ...req.body,
  };

  db.dinosaurs = db.dinosaurs.map(d =>d.id === +req.params.id? updatedDino : d)

  /** команда для отправки в консоли 
  fetch("http://localhost:4000/dinos/1", {
    method: "put",
    body: JSON.stringify({ name: "Another dino", length: 4 }),
    headers: { "content-type": "application/json" },
  }).then(res => res.json()).then(json=>console.log(json));
  */

  res.status(201).json(updatedDino);
});

app.delete("/dinos/:id", (req, res) => {
  let foundedDino = db.dinosaurs.find((d) => d.id === +req.params.id);
  if (!foundedDino) {
    res.sendStatus(400);
    return;
  }
  db.dinosaurs = db.dinosaurs.filter((d) => d.id !== +req.params.id)
  
  res.status(200).json(foundedDino);

  // fetch("http://localhost:4000/dinos/8", {
  //   method: "delete",
  // }).then(res => res.json()).then(json=>console.log(json));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//для запуска tsc локально - npx tsc
