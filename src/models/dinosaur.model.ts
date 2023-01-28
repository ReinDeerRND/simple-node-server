export type DinosaurType = {
  id: number;
  name: string;
  weight?: number; //kg
  length?: number; //m
  isPredator?: boolean;
  period?: Period;
};

export enum Period {
  Jurassic = "Jurassic", // Юрский
  Cretaceous = "Cretaceous", // Меловой
  Triassic = "Triassic", // Триассовый
}
