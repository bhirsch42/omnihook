import { ReactNode } from "react";
import { BackgroundView } from "../components/BackgroundView";
import { ManufacturerView } from "../components/ManufacturerView";
import { SkillView } from "../components/SkillView";
import { CoreBonusView } from "../components/CoreBonusView";
import { SearchCollection } from "../components/SearchCollection";
import { SearchResultsSection } from "../components/SearchCollection/SearchResultsSection";
import { SearchResultSidebarItem } from "../components/SearchCollection/SearchResultSidebarItem";
import { SearchResultLabel } from "../components/SearchCollection/SearchResultLabel";
import { TalentView } from "../components/TalentView";
import { PilotGearView } from "../components/PilotGearView";
import { SearchResult } from "../components/SearchCollection/SearchResult";
import { MechFrameView } from "../components/MechFrameView";
import { Collection } from "../utils/collection";
import { NpcTemplateView } from "../components/NpcTemplateView";
import { NpcTemplate } from "../schemas/lancerData/npcTemplate.schema";
import { useCollections } from "../hooks/useCollections";
import { NpcClass } from "../schemas/lancerData/npcClass.schema";
import { NpcClassView } from "../components/NpcClassView";

type CompendiumCollection<T> = {
  collection: Collection<T>;
  renderItem: (item: T) => ReactNode;
  label: string;
};

function createCompendiumCollection<T>(
  collection: Collection<T>,
  label: string,
  renderItem: (item: T) => ReactNode
): CompendiumCollection<T> {
  return { collection, label, renderItem };
}

function useCompendiumCollections() {
  const lancerCollections = useCollections();

  return [
    createCompendiumCollection<NpcClass>(
      lancerCollections.npcClasses,
      "NPC Classes",
      (item) => <NpcClassView npcClass={item} />
    ),
    createCompendiumCollection<NpcTemplate>(
      lancerCollections.npcTemplates,
      "NPC Templates",
      (item) => <NpcTemplateView npcTemplate={item} />
    ),
    createCompendiumCollection(
      lancerCollections.mechFrames,
      "Mech Frames",
      (item) => <MechFrameView mechFrame={item} />
    ),
    createCompendiumCollection(
      lancerCollections.pilotGear,
      "Pilot Gear",
      (item) => <PilotGearView pilotGear={item} showDescription />
    ),
    createCompendiumCollection(lancerCollections.talents, "Talents", (item) => (
      <TalentView talent={item} showDescription />
    )),
    createCompendiumCollection(
      lancerCollections.coreBonuses,
      "Core Bonuses",
      (item) => <CoreBonusView coreBonus={item} />
    ),
    createCompendiumCollection(
      lancerCollections.backgrounds,
      "Backgrounds",
      (item) => <BackgroundView background={item} />
    ),
    createCompendiumCollection(
      lancerCollections.manufacturers,
      "Manufacturers",
      (item) => <ManufacturerView manufacturer={item} />
    ),
    createCompendiumCollection(lancerCollections.skills, "Skills", (item) => (
      <SkillView skill={item} />
    )),
  ];
}

export function Compendium() {
  const compendiumCollections = useCompendiumCollections();
  return (
    <SearchCollection
      renderSidebar={(query) =>
        compendiumCollections.map((compendiumCollection) => (
          <SearchResultsSection
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
        compendiumCollections.map((compendiumCollection) => (
          <SearchResultsSection
            key={compendiumCollection.label}
            query={query}
            collection={compendiumCollection.collection}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                {compendiumCollection.renderItem(item as any)}
              </SearchResult>
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
