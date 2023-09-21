import express from "express";
import { db } from "../data/dino-db";
import { getDinosaurRouter } from "./routers/dinosaurs";
import { getRootRouter } from "./routers/root";
import { getTestRouter } from "./routers/tests";

export const app = express();

//middleware - программы, которые выполняются до коллбек-функции (req,res) =>{...}
const jsonParseMiddleware = express.json();
app.use(jsonParseMiddleware);

app.use("/", getRootRouter(db));
app.use("/dinos", getDinosaurRouter(db));
app.use("/_test_", getTestRouter(db));
