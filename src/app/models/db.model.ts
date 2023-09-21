import { Period } from "./dinosaur.model";

export type DBType = {
  dinosaurs: DBItemType[];
};

export type DBItemType = {
  id: number;
  created: Date;
  edited?: Date;
  name: string;
  weight?: number; //kg
  length?: number; //m
  isPredator?: boolean;
  period?: Period;
};
