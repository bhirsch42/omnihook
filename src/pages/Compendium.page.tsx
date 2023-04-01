import { ReactNode } from "react";
import { SkillView } from "../components/SkillView";
import { SearchCollection } from "../components/SearchCollection";
import { SearchResultsSection } from "../components/SearchCollection/SearchResultsSection";
import { SearchResultSidebarItem } from "../components/SearchCollection/SearchResultSidebarItem";
import { SearchResultLabel } from "../components/SearchCollection/SearchResultLabel";
import { SearchResult } from "../components/SearchCollection/SearchResult";
import { Collection, CollectionItem } from "../utils/collection";
import { useCollections } from "../hooks/useCollections";
import { ManufacturerView } from "../components/ManufacturerView";
import { BackgroundView } from "../components/BackgroundView";
import { CoreBonusView } from "../components/CoreBonusView";
import { MechFrameView } from "../components/MechFrameView";
import { NpcClassView } from "../components/NpcClassView";
import { NpcTemplateView } from "../components/NpcTemplateView";
import { PilotGearView } from "../components/PilotGearView";
import { TalentView } from "../components/TalentView";
import { NpcClass } from "../schemas/lancerData/npcClass.schema";
import { NpcTemplate } from "../schemas/lancerData/npcTemplate.schema";

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

type UseCompendiumCollectionsReturns = ReturnType<
  typeof useCompendiumCollections
>;

type CompendiumSearchResultItem = ReturnType<
  UseCompendiumCollectionsReturns[number]["collection"]["all"]
>[number];

type ExtractCollection<T> = T extends CompendiumCollection<infer U> ? T : never;

function CompendiumSidebarSection<T extends CollectionItem>({
  compendiumCollection,
  query,
}: {
  compendiumCollection: CompendiumCollection<T>;
  query: string;
}) {
  return (
    <SearchResultsSection
      key={compendiumCollection.label}
      query={query}
      collection={compendiumCollection.collection}
      renderItem={(item) => (
        <SearchResultSidebarItem item={item} key={item.id} />
      )}
      label={
        <SearchResultLabel>{compendiumCollection.label}</SearchResultLabel>
      }
      className="mb-3"
    />
  );
}

function CompendiumMainSection<T extends CollectionItem>({
  compendiumCollection,
  query,
}: {
  compendiumCollection: CompendiumCollection<T>;
  query: string;
}) {
  return (
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
        <SearchResultLabel>{compendiumCollection.label}</SearchResultLabel>
      }
      className="mb-3"
    />
  );
}
export function Compendium() {
  const compendiumCollections = useCompendiumCollections();
  const lancerCollections = useCollections();

  return (
    <SearchCollection
      renderSidebar={(query) => (
        <>
          <SearchResultsSection
            query={query}
            collection={lancerCollections.npcClasses}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>NPC Classes</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.npcTemplates}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>NPC Templates</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.mechFrames}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>Mech Frames</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.pilotGear}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>Pilot Gear</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.talents}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>Talents</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.coreBonuses}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>Core Bonuses</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.backgrounds}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>Backgrounds</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.manufacturers}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>Manufacturers</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.skills}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>Skills</SearchResultLabel>}
            className="mb-3"
          />
        </>
      )}
      renderMain={(query) => (
        <>
          <SearchResultsSection
            query={query}
            collection={lancerCollections.npcClasses}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <NpcClassView npcClass={item} key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>NPC Classes</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.npcTemplates}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <NpcTemplateView npcTemplate={item} key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>NPC Templates</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.mechFrames}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <MechFrameView mechFrame={item} key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>Mech Frames</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.pilotGear}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <PilotGearView pilotGear={item} showDescription key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>Pilot Gear</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.talents}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <TalentView talent={item} showDescription key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>Talents</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.coreBonuses}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <CoreBonusView coreBonus={item} key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>Core Bonuses</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.backgrounds}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <BackgroundView background={item} key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>Backgrounds</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.manufacturers}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <ManufacturerView manufacturer={item} key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>Manufacturers</SearchResultLabel>}
            className="mb-3"
          />
          <SearchResultsSection
            query={query}
            collection={lancerCollections.skills}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <SkillView skill={item} key={item.id} />
              </SearchResult>
            )}
            label={<SearchResultLabel>Skills</SearchResultLabel>}
            className="mb-3"
          />
        </>
      )}
    />
  );
}
