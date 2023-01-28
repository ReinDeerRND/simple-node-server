import { DBItemType } from "../models/db.model";
import { DinosaurType } from "../models/dinosaur.model";

export function convertFromDBtoAPItype(item: DBItemType): DinosaurType {
  return {
    id: item.id,
    name: item.name,
    ...(item.weight&& {weight: item.weight}),
    ...(item.length && {length: item.length}),
    ...(item.isPredator && {isPredator: item.isPredator}),
    ...(item.period && {period: item.period})
  };
}
