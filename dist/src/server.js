"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dino_db_1 = require("../data/dino-db");
const http_codes_model_1 = require("./models/http-codes.model");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 4000;
//middleware - программы, которые выполняются до коллбек-функции (req,res) =>{...}
const jsonParseMiddleware = express_1.default.json();
exports.app.use(jsonParseMiddleware);
exports.app.get("/", (req, res) => {
    res.send({ title: "Hello World!" });
});
exports.app.get("/dinos", (req, res) => {
    let dinos = dino_db_1.db.dinosaurs;
    if (!dinos) {
        res.sendStatus(http_codes_model_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
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
    res.status(http_codes_model_1.HTTP_STATUS.OK).json(dinos);
    //res.send(dinos) // слишком универсальный метод
    // res.sendStatus(400) // отправляем код ответа
});
exports.app.get("/dinos/count", (req, res) => {
    if (!dino_db_1.db.dinosaurs) {
        res.sendStatus(http_codes_model_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
        return;
    }
    res.json({ count: dino_db_1.db.dinosaurs.length });
});
exports.app.get("/dinos/:id", (req, res) => {
    let foundedDino = dino_db_1.db.dinosaurs.find((d) => d.id === +req.params.id);
    if (!foundedDino) {
        res.sendStatus(http_codes_model_1.HTTP_STATUS.NOT_FOUND);
        return;
    }
    res.json(foundedDino);
});
exports.app.post("/dinos", (req, res) => {
    if (!req.body.name) {
        res.sendStatus(http_codes_model_1.HTTP_STATUS.BAD_REQUEST);
        return;
    }
    const newDinosaur = Object.assign({ id: dino_db_1.db.dinosaurs.length }, req.body);
    /** команда для отправки в консоли
  fetch("http://localhost:4000/dinos", {
    method: "post",
    body: JSON.stringify({ name: "Another dino", length: 4 }),
    headers: { "content-type": "application/json" },
  }).then(res => res.json()).then(json=>console.log(json));
  */
    dino_db_1.db.dinosaurs.push(newDinosaur);
    res.status(http_codes_model_1.HTTP_STATUS.CREATED).json(newDinosaur);
});
exports.app.put("/dinos/:id", (req, res) => {
    let foundedDino = dino_db_1.db.dinosaurs.find((d) => d.id === +req.params.id);
    if (!foundedDino) {
        res.sendStatus(http_codes_model_1.HTTP_STATUS.NOT_FOUND);
        return;
    }
    let updatedDino = Object.assign(Object.assign({}, foundedDino), req.body);
    dino_db_1.db.dinosaurs = dino_db_1.db.dinosaurs.map((d) => d.id === +req.params.id ? updatedDino : d);
    /** команда для отправки в консоли
  fetch("http://localhost:4000/dinos/1", {
    method: "put",
    body: JSON.stringify({ name: "Another dino", length: 4 }),
    headers: { "content-type": "application/json" },
  }).then(res => res.json()).then(json=>console.log(json));
  */
    res.status(http_codes_model_1.HTTP_STATUS.OK).json(updatedDino);
});
exports.app.delete("/dinos/:id", (req, res) => {
    let foundedDino = dino_db_1.db.dinosaurs.find((d) => d.id === +req.params.id);
    if (!foundedDino) {
        res.sendStatus(http_codes_model_1.HTTP_STATUS.BAD_REQUEST);
        return;
    }
    dino_db_1.db.dinosaurs = dino_db_1.db.dinosaurs.filter((d) => d.id !== +req.params.id);
    res.status(http_codes_model_1.HTTP_STATUS.OK).json(foundedDino);
    // fetch("http://localhost:4000/dinos/8", {
    //   method: "delete",
    // }).then(res => res.json()).then(json=>console.log(json));
});
exports.app.delete("/_test_/data", (req, res) => {
    dino_db_1.db.dinosaurs = [];
    res.sendStatus(http_codes_model_1.HTTP_STATUS.NO_CONTENT);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//для запуска tsc локально - npx tsc
