import express, { Response } from "express";
import { DBItemType, DBType } from "../models/db.model";

import { RequestWithQueryParams } from "../models/request.types";

export const getRootRouter = (db: DBType) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send({ title: "Hello Dino World!" });
  });

  router.get(
    "/db",
    (
      req: RequestWithQueryParams<{ pass: string }>,
      res: Response<DBItemType[]>
    ) => {
      if (req.query.pass === "rnd") {
        res.json(db.dinosaurs);
      } else {
        res.json([]);
      }
    }
  );

  return router;
};
