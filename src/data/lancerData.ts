import rawLancerData from "lancer-data";
import { lancerDataSchema } from "../schemas/lancerData/index.schema";
import Fuse from "fuse.js";
import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { Talent } from "../schemas/lancerData/talent.schema";
import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { Frame } from "../schemas/lancerData/frame.schema";

export const lancerData = lancerDataSchema.parse(rawLancerData);

export type Collection<T> = {
  search: (query: string) => T[];
  find: (id: string) => T;
  findSafe: (id: string) => T | null;
  findAll: (ids: string[]) => T[];
  all: () => T[];
  filter: (fn: (item: T) => boolean) => Collection<T>;
};

function createCollection<T extends { id: string }>(
  items: T[],
  keys: keyof T extends string ? (keyof T)[] : never[]
): Collection<T> {
  const validItems = items.filter((item) => !item.id.match(/^missing_/));

  const fuse = new Fuse(validItems, {
    keys,
  });

  function find(id: string) {
    const item = validItems.find((item) => item.id === id);
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
      return validItems.find((item) => item.id === id) || null;
    },
    all: () => validItems,
    filter(fn) {
      return createCollection(validItems.filter(fn), keys);
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
  pilotGear: createCollection(lancerData.pilotGear as PilotGear[], ["name"]),
  mechFrames: createCollection(lancerData.frames as Frame[], ["name"]),
} as const;
