import Fuse from "fuse.js";

export type Collection<T> = {
  search: (query: string) => T[];
  find: (id: string) => T;
  findSafe: (id: string) => T | null;
  findAll: (ids: string[]) => T[];
  all: () => T[];
  filter: (fn: (item: T) => boolean) => Collection<T>;
};

export type CollectionItem = { id: string; name: string };

export function createCollection<T extends CollectionItem>(
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
