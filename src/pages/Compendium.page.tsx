import { Collection, lancerCollections } from "../data/lancerData";
import { ReactNode } from "react";
import { BackgroundView } from "../components/BackgroundView";
import { ManufacturerView } from "../components/ManufacturerView";
import { SkillView } from "../components/SkillView";
import { Background } from "../schemas/lancerData/background.schema";
import { Manufacturer } from "../schemas/lancerData/manufacturer.schema";
import { Skill } from "../schemas/lancerData/skill.schema";
import { CoreBonusView } from "../components/CoreBonusView";
import { CoreBonus } from "../schemas/lancerData/coreBonus.schema";
import { SearchCollection } from "../components/SearchCollection";
import { SearchResults } from "../components/SearchCollection/SearchResults";
import { SearchResultSidebarItem } from "../components/SearchCollection/SearchResultSidebarItem";
import { SearchResultLabel } from "../components/SearchCollection/SearchResultLabel";
import { Talent } from "../schemas/lancerData/talent.schema";
import { TalentView } from "../components/TalentView";

type CompendiumCollection<T> = {
  collection: Collection<T>;
  renderItem: (item: T) => ReactNode;
  label: string;
};

const COMPENDIUM_COLLECTIONS = [
  {
    collection: lancerCollections.talents,
    renderItem: (item) => <TalentView talent={item} />,
    label: "Talents",
  } as const satisfies CompendiumCollection<Talent>,
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
  return (
    <SearchCollection
      renderSidebar={(query) =>
        COMPENDIUM_COLLECTIONS.map((compendiumCollection) => (
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
        ))
      }
      renderMain={(query) =>
        COMPENDIUM_COLLECTIONS.map((compendiumCollection) => (
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
        ))
      }
    />
  );
}
