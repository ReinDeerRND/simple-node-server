import { DBType, Period } from "../src/models/dinosaur.models";

export const db: DBType = {
  dinosaurs: [
    {
      id: 0,
      name: "Triceratops",
      weight: 10000,
      length: 7,
      isPredator: false,
      period: Period.Cretaceous,
    },
    {
      id: 1,
      name: "Stegosaurs",
      weight: 4000,
      length: 9,
      isPredator: false,
      period: Period.Jurassic,
    },
    {
      id: 2,
      name: "Velociraptor",
      isPredator: true,
      period: Period.Cretaceous,
    },
    {
      id: 3,
      name: "Diplodocus",
      isPredator: false,
      weight: 114000,
      length: 55,
      period: Period.Jurassic,
    },
    {
      id: 4,
      name: "Brachiosaurus",
      weight: 55000,
      length: 20,
      isPredator: false,
      period: Period.Jurassic,
    },
    {
      id: 5,
      name: "Notosaurus",
      weight: 300,
      length: 5,
      isPredator: true,
      period: Period.Triassic,
    },
    {
      id: 6,
      name: "Ichthyosaurus",
      weight: 2000,
      length: 5,
      isPredator: true,
      period: Period.Jurassic,
    },
    { id: 7, name: "Pterodactyl", isPredator: true, period: Period.Jurassic },
  ],
};
