import { lancerCollections } from "../../data/lancerData";
import { SkillView } from "../../components/SkillView";
import { SearchCollection } from "../../components/SearchCollection";
import { SearchResults } from "../../components/SearchCollection/SearchResults";
import { SearchResultSidebarItem } from "../../components/SearchCollection/SearchResultSidebarItem";

const { skills: skillsCollection } = lancerCollections;

type ChooseSkillProps = {
  onSelect: (skillId: string) => void;
  alreadySelectedSkillIds: string[];
};

export function ChooseSkill({
  onSelect,
  alreadySelectedSkillIds,
}: ChooseSkillProps) {
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
          collection={skillsCollection.filter(
            (skill) => !alreadySelectedSkillIds.includes(skill.id)
          )}
          label="Select a new skill:"
          renderItem={(item) => (
            <button
              className="p-3 mb-3 bg-bgcolor-800 w-full text-left hover:bg-bgcolor-700 transition-colors"
              key={item.id}
              onClick={() => onSelect(item.id)}
            >
              <SkillView skill={item} />
            </button>
          )}
          className="mb-3"
        />
      )}
    />
  );
}
