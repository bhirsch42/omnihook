import rawLancerData from "lancer-data";
import { lancerDataSchema } from "../schemas/lancerData.schema";
import Fuse from "fuse.js";
import { CoreBonus } from "../schemas/coreBonus.schema";

console.log(rawLancerData);
export const lancerData = lancerDataSchema.parse(rawLancerData);

export type Collection<T> = {
  search: (query: string) => T[];
  all: T[];
};

function createCollection<T>(
  items: T[],
  keys: keyof T extends string ? (keyof T)[] : never[]
): Collection<T> {
  const fuse = new Fuse(items, {
    keys,
  });

  return {
    search(query: string) {
      return fuse.search(query).map((result) => result.item);
    },
    all: items,
  } as const;
}

export const lancerCollections = {
  manufacturers: createCollection(lancerData.manufacturers, [
    "name",
    "description",
    "quote",
  ]),
  backgrounds: createCollection(lancerData.backgrounds, [
    "name",
    "description",
  ]),
  skills: createCollection(lancerData.skills, ["name", "description"]),
  coreBonuses: createCollection(lancerData.coreBonuses as CoreBonus[], [
    "name",
    "description",
    "effect",
    "mountedEffect",
  ]),
} as const;
