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
          collection={lancerCollections.talents}
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
            <TalentView
              className="p-3 mb-3 bg-bgcolor-800"
              talent={item}
              pilotId={pilotId}
              isEditing={true}
              key={item.id}
            />
          )}
          className="mb-3"
        />
      )}
    />
  );
}
