import { Collection, lancerCollections } from "../data/lancerData";
import { ChangeEvent, PropsWithChildren, ReactNode, useState } from "react";
import { Input } from "../components/Input";
import { BackgroundView } from "../components/BackgroundView";
import { ManufacturerView } from "../components/ManufacturerView";
import { SkillView } from "../components/SkillView";
import { Background } from "../schemas/lancerData/background.schema";
import { Manufacturer } from "../schemas/lancerData/manufacturer.schema";
import { Skill } from "../schemas/lancerData/skill.schema";
import { CoreBonusView } from "../components/CoreBonusView";
import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";

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
    renderItem: (item) => <CoreBonusView coreBonus={item} />,
    label: "Core Bonuses",
  } as const satisfies CompendiumCollection<CoreBonus>,
  {
    collection: lancerCollections.backgrounds,
    renderItem: (item) => <BackgroundView background={item} />,
    label: "Backgrounds",
  } as const satisfies CompendiumCollection<Background>,
  {
    collection: lancerCollections.manufacturers,
    renderItem: (item) => <ManufacturerView manufacturer={item} />,
    label: "Manufacturers",
  } as const satisfies CompendiumCollection<Manufacturer>,
  {
    collection: lancerCollections.skills,
    renderItem: (item) => <SkillView skill={item} />,
    label: "Skills",
  } as const satisfies CompendiumCollection<Skill>,
] as const;

export function Compendium() {
  const [query, setQuery] = useState("");

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex h-full">
      <div className="pl-3 mr-5">
        <div className="flex flex-col h-full whitespace-nowrap">
          <div className="pt-3">
            <Input
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Search compendium..."
              className="w-full mb-3"
            ></Input>
          </div>
          <div className="overflow-y-scroll basis-0 grow">
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
      </div>
      <div className="col-span-3 flex flex-col h-full">
        <div className="basis-0 grow overflow-scroll pr-3 pt-3">
          {COMPENDIUM_COLLECTIONS.map((compendiumCollection) => (
            <SearchResults
              key={compendiumCollection.label}
              query={query}
              collection={compendiumCollection.collection}
              renderItem={(item) => (
                <div className="p-3 mb-3 bg-bgcolor-800" key={item.id}>
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
    </div>
  );
}
