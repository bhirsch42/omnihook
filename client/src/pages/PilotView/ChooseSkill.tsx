import { lancerCollections } from "../../data/lancerData";
import { SkillView } from "../../components/SkillView";
import { SearchCollection } from "../../components/SearchCollection";
import { SearchResultsSection } from "../../components/SearchCollection/SearchResultsSection";
import { SearchResultSidebarItem } from "../../components/SearchCollection/SearchResultSidebarItem";
import { SearchResult } from "../../components/SearchCollection/SearchResult";

const { skills: skillsCollection } = lancerCollections;

type ChooseSkillProps = {
  onSelect: (skillId: string) => void;
  alreadySelectedSkillIds: string[];
};

export function ChooseSkill({
  onSelect,
  alreadySelectedSkillIds,
}: ChooseSkillProps) {
  const collection = skillsCollection.filter(
    (skill) => !alreadySelectedSkillIds.includes(skill.id)
  );

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
          label="Select a new skill:"
          renderItem={(item) => (
            <SearchResult id={item.id} key={item.id}>
              <SkillView skill={item} onSelect={onSelect} />
            </SearchResult>
          )}
          className="mb-3"
        />
      )}
    />
  );
}
