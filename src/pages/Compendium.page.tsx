import { Link } from "@tanstack/react-router";
import { Collection, lancerData, lancerFuse } from "../data/lancerData";
import Fuse from "fuse.js";
import {
  ChangeEvent,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { Background } from "../schemas/background.schema";
import { Manufacturer } from "../schemas/manufacturer.schema";
import { Skill } from "../schemas/skill.schema";

function Background({ background }: { background: Background }) {
  return (
    <div className="mb-5" id={background.id}>
      <div className="font-bold text-lg">{background.name}</div>
      <div dangerouslySetInnerHTML={{ __html: background.description }}></div>
    </div>
  );
}

function Skill({ skill }: { skill: Skill }) {
  return (
    <div className="mb-5" id={skill.id}>
      <div className="font-bold text-lg">{skill.name}</div>
      <div dangerouslySetInnerHTML={{ __html: skill.description }}></div>
    </div>
  );
}

function Manufacturer({ manufacturer }: { manufacturer: Manufacturer }) {
  return (
    <div className="mb-5" id={manufacturer.id}>
      <div className="font-bold text-lg">{manufacturer.name}</div>
      <div
        dangerouslySetInnerHTML={{ __html: manufacturer.quote }}
        className="border-l-2 border-green-400 pl-3 ml-3"
      ></div>
      <div dangerouslySetInnerHTML={{ __html: manufacturer.description }}></div>
    </div>
  );
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      autoComplete="off"
      autoCorrect="off"
      className={`bg-transparent border border-green-700 py-1 px-3 outline-none focus:border-green-400 placeholder-green-700 transition-colors ${props.className}`}
    ></input>
  );
}

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
      {label}
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
    collection: lancerFuse.backgrounds,
    renderItem: (item) => <Background background={item} />,
    label: "Backgrounds",
  } as const satisfies CompendiumCollection<Background>,
  {
    collection: lancerFuse.manufacturers,
    renderItem: (item) => <Manufacturer manufacturer={item} />,
    label: "Manufacturers",
  } as const satisfies CompendiumCollection<Manufacturer>,
  {
    collection: lancerFuse.skills,
    renderItem: (item) => <Skill skill={item} />,
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
      {/* <div className="flex justify-center mb-5">
      </div> */}
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
                query={query}
                collection={compendiumCollection.collection}
                renderItem={(item) => <SearchResultSidebarItem item={item} />}
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
              query={query}
              collection={compendiumCollection.collection}
              renderItem={(item) =>
                compendiumCollection.renderItem(item as any)
              }
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
