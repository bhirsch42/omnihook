import { lancerCollections } from "../../data/lancerData";
import { PilotGearView } from "../../components/PilotGearView";
import { SearchCollection } from "../../components/SearchCollection";
import { SearchResultsSection } from "../../components/SearchCollection/SearchResultsSection";
import { SearchResultSidebarItem } from "../../components/SearchCollection/SearchResultSidebarItem";
import { PilotGearType } from "../../schemas/lancerData/pilotGearType.schema";
import { SearchResult } from "../../components/SearchCollection/SearchResult";

const { pilotGear: pilotGearCollection } = lancerCollections;

type ChoosePilotGearProps = {
  onSelect: (pilotGearId: string) => void;
  type: PilotGearType;
};

export function ChoosePilotGear({ onSelect, type }: ChoosePilotGearProps) {
  const collection = pilotGearCollection.filter((gear) => gear.type === type);

  return (
    <SearchCollection
      renderSidebar={(query) => (
        <SearchResultsSection
          query={query}
          collection={collection}
          renderItem={(item) => (
            <SearchResultSidebarItem item={item} key={item.id} />
          )}
          className="mb-3"
        />
      )}
      renderMain={(query) => (
        <SearchResultsSection
          query={query}
          collection={collection}
          label="Select a new pilotGear:"
          renderItem={(item) => (
            <SearchResult id={item.id} key={item.id}>
              <PilotGearView
                pilotGear={item}
                onSelect={() => onSelect(item.id)}
              />
            </SearchResult>
          )}
          className="mb-3"
        />
      )}
    />
  );
}
