import { ChangeEvent, ReactNode, useState } from "react";
import { Input } from "../Input";

type SearchCollectionProps = {
  renderSidebar: (query: string) => ReactNode;
  renderMain: (query: string) => ReactNode;
};

export function SearchCollection({
  renderSidebar,
  renderMain,
}: SearchCollectionProps) {
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
              placeholder="Search..."
              className="w-full mb-3"
            ></Input>
          </div>
          <div className="overflow-y-scroll basis-0 grow">
            {renderSidebar(query)}
          </div>
        </div>
      </div>
      <div className="col-span-3 flex flex-col h-full w-full">
        <div className="basis-0 grow overflow-scroll pr-3 pt-3">
          {renderMain(query)}
        </div>
      </div>
    </div>
  );
}
