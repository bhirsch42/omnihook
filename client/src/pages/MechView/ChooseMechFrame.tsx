import { lancerCollections } from "../../data/lancerData";
import { MechFrameView } from "../../components/MechFrameView";
import { SearchCollection } from "../../components/SearchCollection";
import { SearchResultsSection } from "../../components/SearchCollection/SearchResultsSection";
import { SearchResultSidebarItem } from "../../components/SearchCollection/SearchResultSidebarItem";
import { SearchResult } from "../../components/SearchCollection/SearchResult";
import { Frame } from "../../schemas/lancerData/frame.schema";
import { MechLicense } from "../../schemas/mechLicense.schema";
import { useAppSelector } from "../../store/hooks";
import { selectActivePilot } from "../../store/pilots/selectors/selectActivePilot";
const { mechFrames: mechFrameCollection } = lancerCollections;

type ChooseMechFrameProps = {
  onSelect: (mechFrameId: string) => void;
  licenses: MechLicense[];
};

function hasLicense(mechFrame: Frame, licenses: MechLicense[]): boolean {
  console.log(
    "hasLicense",
    mechFrame,
    licenses,
    !!licenses.find((license) => license.licenseId === mechFrame.licenseId)
  );
  return !!licenses.find(
    (license) => license.licenseId === mechFrame.licenseId
  );
}

export function ChooseMechFrame({ onSelect, licenses }: ChooseMechFrameProps) {
  const pilot = useAppSelector(selectActivePilot);
  const collection = mechFrameCollection.filter((frame) =>
    hasLicense(frame, pilot.licenses)
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
          label="Select a new mech frame:"
          renderItem={(item) => (
            <SearchResult id={item.id} key={item.id}>
              <MechFrameView mechFrame={item} onSelect={onSelect} />
            </SearchResult>
          )}
          className="mb-3"
        />
      )}
    />
  );
}
