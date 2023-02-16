import rawLancerData from "lancer-data";
import { lancerDataSchema } from "../schemas/lancerData.schema";
import Fuse from "fuse.js";

export const lancerData = lancerDataSchema.parse(rawLancerData);

export type Collection<T> = {
  search: (query: string) => T[];
  all: T[];
};

function createFuse<T>(
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

export const lancerFuse = {
  manufacturers: createFuse(lancerData.manufacturers, [
    "name",
    "description",
    "quote",
  ]),
  backgrounds: createFuse(lancerData.backgrounds, ["name", "description"]),
  skills: createFuse(lancerData.skills, ["name", "description"]),
} as const;
