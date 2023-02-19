import rawLancerData from "lancer-data";
import { lancerDataSchema } from "../schemas/lancerData/index.schema";
import Fuse from "fuse.js";
import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { Talent } from "../schemas/lancerData/talent.schema";

console.log(rawLancerData);
export const lancerData = lancerDataSchema.parse(rawLancerData);

export type Collection<T> = {
  search: (query: string) => T[];
  find: (id: string) => T;
  findSafe: (id: string) => T | null;
  findAll: (ids: string[]) => T[];
  all: T[];
  filter: (fn: (item: T) => boolean) => Collection<T>;
};

function createCollection<T extends { id: string }>(
  items: T[],
  keys: keyof T extends string ? (keyof T)[] : never[]
): Collection<T> {
  const fuse = new Fuse(items, {
    keys,
  });

  function find(id: string) {
    const item = items.find((item) => item.id === id);
    if (!item) throw new Error(`Could not find item: ${id}`);
    return item;
  }

  return {
    find,
    findAll(ids: string[]) {
      return ids.map(find);
    },
    search(query: string) {
      return fuse.search(query).map((result) => result.item);
    },
    findSafe(id: string) {
      return items.find((item) => item.id === id) || null;
    },
    all: items,
    filter(fn) {
      return createCollection(items.filter(fn), keys);
    },
  } as const;
}

export const lancerCollections = {
  manufacturers: createCollection(lancerData.manufacturers, ["name"]),
  backgrounds: createCollection(lancerData.backgrounds, ["name"]),
  skills: createCollection(lancerData.skills, ["name"]),
  coreBonuses: createCollection(lancerData.coreBonuses as CoreBonus[], [
    "name",
  ]),
  talents: createCollection(lancerData.talents as Talent[], ["name"]),
} as const;
