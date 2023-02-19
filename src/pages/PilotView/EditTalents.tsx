import { lancerCollections } from "../../data/lancerData";
import { SearchCollection } from "../../components/SearchCollection";
import { SearchResults } from "../../components/SearchCollection/SearchResults";
import { SearchResultSidebarItem } from "../../components/SearchCollection/SearchResultSidebarItem";
import { TalentView } from "../../components/TalentView";

const { skills: skillsCollection } = lancerCollections;

type EditTalentsProps = {
  pilotId: string;
};

export function EditTalents({ pilotId }: EditTalentsProps) {
  return (
    <SearchCollection
      renderSidebar={(query) => (
        <SearchResults
          query={query}
          collection={skillsCollection}
          renderItem={(item) => (
            <SearchResultSidebarItem item={item} key={item.id} />
          )}
          className="mb-3"
        />
      )}
      renderMain={(query) => (
        <SearchResults
          query={query}
          collection={lancerCollections.talents}
          label="Select a new skill:"
          renderItem={(item) => (
            <TalentView talent={item} pilotId={pilotId} isEditing={true} />
          )}
          className="mb-3"
        />
      )}
    />
  );
}
