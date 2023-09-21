import { DBType } from "../app/models/db.model";
import { Period } from "../app/models/dinosaur.model";

export const db: DBType = {
  dinosaurs: [
    {
      id: 0,
      created: new Date("2023-01-17"),
      name: "Triceratops",
      weight: 10000,
      length: 7,
      isPredator: false,
      period: Period.Cretaceous,
    },
    {
      id: 1,
      created: new Date("2023-01-17"),
      name: "Stegosaurs",
      weight: 4000,
      length: 9,
      isPredator: false,
      period: Period.Jurassic,
    },
    {
      id: 2,
      created: new Date("2023-01-17"),
      name: "Velociraptor",
      isPredator: true,
      period: Period.Cretaceous,
    },
    {
      id: 3,
      created: new Date("2023-01-17"),
      name: "Diplodocus",
      isPredator: false,
      weight: 114000,
      length: 55,
      period: Period.Jurassic,
    },
    {
      id: 4,
      created: new Date("2023-01-17 23:00:00"),
      name: "Brachiosaurus",
      weight: 55000,
      length: 20,
      isPredator: false,
      period: Period.Jurassic,
      edited: new Date("2023-01-20 23:00:00"),
    },
    {
      id: 5,
      created: new Date("2023-01-17"),
      name: "Notosaurus",
      weight: 300,
      length: 5,
      isPredator: true,
      period: Period.Triassic,
    },
    {
      id: 6,
      created: new Date("2023-01-17"),
      name: "Ichthyosaurus",
      weight: 2000,
      length: 5,
      isPredator: true,
      period: Period.Jurassic,
    },
    {
      id: 7,
      created: new Date("2023-01-17"),
      name: "Pterodactyl",
      isPredator: true,
      period: Period.Jurassic,
    },
  ],
};