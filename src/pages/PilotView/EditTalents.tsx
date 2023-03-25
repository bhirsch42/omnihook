import { SearchCollection } from "../../components/SearchCollection";
import { SearchResultsSection } from "../../components/SearchCollection/SearchResultsSection";
import { SearchResultSidebarItem } from "../../components/SearchCollection/SearchResultSidebarItem";
import { TalentView } from "../../components/TalentView";
import { SearchResult } from "../../components/SearchCollection/SearchResult";
import { useCollections } from "../../hooks/useCollections";

type EditTalentsProps = {
  pilotId: string;
};

export function EditTalents({ pilotId }: EditTalentsProps) {
  const { talents } = useCollections();

  return (
    <SearchCollection
      renderSidebar={(query) => (
        <SearchResultsSection
          query={query}
          collection={talents}
          renderItem={(item) => (
            <SearchResultSidebarItem item={item} key={item.id} />
          )}
          className="mb-3"
        />
      )}
      renderMain={(query) => (
        <SearchResultsSection
          query={query}
          collection={talents}
          label="Select a new skill:"
          renderItem={(item) => (
            <SearchResult id={item.id} key={item.id}>
              <TalentView talent={item} pilotId={pilotId} isEditing={true} />
            </SearchResult>
          )}
          className="mb-3"
        />
      )}
    />
  );
}
