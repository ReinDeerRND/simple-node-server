import express from "express";
import { DBType } from "../models/db.model";
import { HTTP_STATUS } from "../models/http-codes.model";

export const getTestRouter = (db: DBType) => {
  const router = express.Router();
  router.delete("/data", (req, res) => {
    db.dinosaurs = [];
    res.sendStatus(HTTP_STATUS.NO_CONTENT);
  });
  return router;
};
