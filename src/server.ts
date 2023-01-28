import express, { Request, Response } from "express";
import { db } from "../data/dino-db";
import { DBItemType } from "./models/db.model";
import { DinosaurType } from "./models/dinosaur.model";
import { HTTP_STATUS } from "./models/http-codes.model";
import {
  RequestWithBody,
  RequestWithBodyAndParams,
  RequestWithParams,
  RequestWithQueryParams,
  SearchParamsType,
} from "./models/request.types";
import { convertFromDBtoAPItype } from "./utils/convert.service";

export const app = express();
const port = process.env.PORT || 4000;

//middleware - программы, которые выполняются до коллбек-функции (req,res) =>{...}
const jsonParseMiddleware = express.json();
app.use(jsonParseMiddleware);

// app.get("/", (req, res) => {
//   res.send(db.dinosaurs);
// });

app.get("/", (req, res) => {
  res.send({ title: "Hello World!" });
});

app.get(
  "/dinos",
  (
    req: RequestWithQueryParams<SearchParamsType>,
    res: Response<DinosaurType[]>
  ) => {
    let dinos = db.dinosaurs.map(convertFromDBtoAPItype);
    if (!dinos) {
      res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
      return;
    }
    if (req.query.name) {
      dinos = dinos.filter((dino) => dino.name.indexOf(req.query.name) > -1);
    }
    if (req.query.minWeight) {
      dinos = dinos.filter((dino) => {
        if (dino.weight) {
          return dino.weight >= +req.query.minWeight;
        }
        return false;
      });
    }
    if (req.query.maxWeight) {
      dinos = dinos.filter((dino) => {
        if (dino.weight) {
          return dino.weight <= +req.query.maxWeight;
        }
        return false;
      });
    }
    res.status(HTTP_STATUS.OK).json(dinos);
    //res.send(dinos) // слишком универсальный метод
    // res.sendStatus(400) // отправляем код ответа
  }
);

app.get("/dinos/count", (req: Request, res: Response<{ count: number }>) => {
  if (!db.dinosaurs) {
    res.sendStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    return;
  }
  res.json({ count: db.dinosaurs.length });
});

app.get(
  "/dinos/:id",
  (req: RequestWithParams<{ id: string }>, res: Response<DinosaurType>) => {
    let foundedDino: DBItemType | undefined = db.dinosaurs.find(
      (d) => d.id === +req.params.id
    );
    if (!foundedDino) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND);
      return;
    }
    res.json(convertFromDBtoAPItype(foundedDino));
  }
);

app.post(
  "/dinos",
  (
    req: RequestWithBody<Omit<DinosaurType, "id">>,
    res: Response<DinosaurType>
  ) => {
    if (!req.body.name) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST);
      return;
    }
    const newDinosaur: DBItemType = {
      id: db.dinosaurs.length,
      created: new Date(),
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
    res.status(HTTP_STATUS.CREATED).json(convertFromDBtoAPItype(newDinosaur));
  }
);

app.put(
  "/dinos/:id",
  (
    req: RequestWithBodyAndParams<Omit<DinosaurType, "id">, { id: string }>,
    res: Response<DinosaurType>
  ) => {
    let foundedDino = db.dinosaurs.find((d) => d.id === +req.params.id);
    if (!foundedDino) {
      res.sendStatus(HTTP_STATUS.NOT_FOUND);
      return;
    }
    let updatedDino = {
      ...foundedDino,
      ...req.body,
      edited: new Date(),
    };

    db.dinosaurs = db.dinosaurs.map((d) =>
      d.id === +req.params.id ? updatedDino : d
    );

    /** команда для отправки в консоли 
      fetch("http://localhost:4000/dinos/1", {
        method: "put",
        body: JSON.stringify({ name: "Another dino", length: 4 }),
        headers: { "content-type": "application/json" },
      }).then(res => res.json()).then(json=>console.log(json));
    */

    res.status(HTTP_STATUS.OK).json(convertFromDBtoAPItype(updatedDino));
  }
);

app.delete(
  "/dinos/:id",
  (req: RequestWithParams<{ id: string }>, res: Response<DinosaurType>) => {
    let foundedDino = db.dinosaurs.find((d) => d.id === +req.params.id);
    if (!foundedDino) {
      res.sendStatus(HTTP_STATUS.BAD_REQUEST);
      return;
    }
    db.dinosaurs = db.dinosaurs.filter((d) => d.id !== +req.params.id);

    res.status(HTTP_STATUS.OK).json(convertFromDBtoAPItype(foundedDino));

    /**
      fetch("http://localhost:4000/dinos/3", {
      method: "delete",
      }).then(res => res.json()).then(json=>console.log(json));
    */
  }
);

/**
 * for testing
 */
app.delete("/_test_/data", (req, res) => {
  db.dinosaurs = [];
  res.sendStatus(HTTP_STATUS.NO_CONTENT);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//для запуска tsc локально - npx tsc
