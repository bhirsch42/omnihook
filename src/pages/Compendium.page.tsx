import { Link } from "@tanstack/react-router";
import { Collection, lancerCollections } from "../data/lancerData";
import { ChangeEvent, PropsWithChildren, ReactNode, useState } from "react";
import { Input } from "../components/Input";
import { BackgroundView } from "../components/BackgroundView";
import { ManufacturerView } from "../components/ManufacturerView";
import { SkillView } from "../components/SkillView";
import { Background } from "../schemas/background.schema";
import { Manufacturer } from "../schemas/manufacturer.schema";
import { Skill } from "../schemas/skill.schema";
import { CoreBonusView } from "../components/CoreBonusView";
import { CoreBonus } from "../schemas/coreBonus.schema";

type SearchResultsProps<T> = {
  query: string;
  collection: Collection<T>;
  renderItem: (item: T) => React.ReactNode;
  label: ReactNode;
  className?: string;
};

function SearchResults<T>({
  query,
  collection,
  renderItem,
  label,
  className,
}: SearchResultsProps<T>) {
  const items = query === "" ? collection.all : collection.search(query);

  return items.length > 0 ? (
    <div className={className}>
      <div className="mb-3">{label}</div>
      {items.map(renderItem)}
    </div>
  ) : null;
}

function SearchResultLabel({ children }: PropsWithChildren) {
  return <div className="text-lg font-bold">=== {children} ===</div>;
}

function SearchResultSidebarItem({
  item,
}: {
  item: { name: string; id: string };
}) {
  return (
    <a className="block" href={`#${item.id}`}>
      {item.name}
    </a>
  );
}

type CompendiumCollection<T> = {
  collection: Collection<T>;
  renderItem: (item: T) => ReactNode;
  label: string;
};

const COMPENDIUM_COLLECTIONS = [
  {
    collection: lancerCollections.coreBonuses,
    renderItem: (item) => <CoreBonusView coreBonus={item} key={item.id} />,
    label: "Core Bonuses",
  } as const satisfies CompendiumCollection<CoreBonus>,
  {
    collection: lancerCollections.backgrounds,
    renderItem: (item) => <BackgroundView background={item} key={item.id} />,
    label: "Backgrounds",
  } as const satisfies CompendiumCollection<Background>,
  {
    collection: lancerCollections.manufacturers,
    renderItem: (item) => (
      <ManufacturerView manufacturer={item} key={item.id} />
    ),
    label: "Manufacturers",
  } as const satisfies CompendiumCollection<Manufacturer>,
  {
    collection: lancerCollections.skills,
    renderItem: (item) => <SkillView skill={item} key={item.id} />,
    label: "Skills",
  } as const satisfies CompendiumCollection<Skill>,
] as const;

export function Compendium() {
  const [query, setQuery] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <div className="mb-5">
        <Link to="/" className="underline">
          Home
        </Link>{" "}
        {">"} Compendium
      </div>
      <div className="grid grid-cols-4 gap-5 grid-flow-col">
        <div className="col-span-1">
          <div className="div sticky top-0 max-h-screen overflow-y-scroll py-3">
            <Input
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Search compendium..."
              className="w-full mb-3"
            ></Input>
            {COMPENDIUM_COLLECTIONS.map((compendiumCollection) => (
              <SearchResults
                key={compendiumCollection.label}
                query={query}
                collection={compendiumCollection.collection}
                renderItem={(item) => (
                  <SearchResultSidebarItem item={item} key={item.id} />
                )}
                label={
                  <SearchResultLabel>
                    {compendiumCollection.label}
                  </SearchResultLabel>
                }
                className="mb-3"
              />
            ))}
          </div>
        </div>
        <div className="col-span-3">
          {COMPENDIUM_COLLECTIONS.map((compendiumCollection) => (
            <SearchResults
              key={compendiumCollection.label}
              query={query}
              collection={compendiumCollection.collection}
              renderItem={(item) => (
                <div className="bg-gray-200 p-3 mb-3">
                  {compendiumCollection.renderItem(item as any)}
                </div>
              )}
              label={
                <SearchResultLabel>
                  {compendiumCollection.label}
                </SearchResultLabel>
              }
              className="mb-3"
            />
          ))}
        </div>
      </div>
    </>
  );
}
