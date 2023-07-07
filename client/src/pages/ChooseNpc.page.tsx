import { ReactNode } from "react";
import { SearchCollection } from "../components/SearchCollection";
import { SearchResultLabel } from "../components/SearchCollection/SearchResultLabel";
import { SearchResultSidebarItem } from "../components/SearchCollection/SearchResultSidebarItem";
import { SearchResultsSection } from "../components/SearchCollection/SearchResultsSection";
import { useCollections } from "../hooks/useCollections";
import { NpcClassView } from "../components/NpcClassView";
import { SearchResult } from "../components/SearchCollection/SearchResult";
import { Button } from "../components/Button";
import { useWindowManager } from "../components/WindowManager/WindowManagerContext";
import { EditNpc } from "./EditNpc.page";
import { useAppDispatch } from "../store/hooks";
import { v4 as uuidv4 } from "uuid";
import { addNpc } from "../store/thunks/addNpc";
import { removeNpc } from "../store/thunks/removeNpc";

type ChooseNpcProps = {
  onSelect: (npcId: string) => void;
};

export function ChooseNpc({ onSelect }: ChooseNpcProps) {
  const lancerCollections = useCollections();
  const { openWindow, closeWindow } = useWindowManager();
  const dispatch = useAppDispatch();

  const handleSelectNpcClass = (classId: string) => {
    const npcId = uuidv4();

    dispatch(addNpc({ id: npcId, classId }));

    const handleSave = () => {
      onSelect(npcId);
      closeWindow(npcId);
    };

    const handleCancel = () => {
      closeWindow(npcId);
      dispatch(removeNpc(npcId));
    };

    openWindow({
      id: npcId,
      label: "Edit NPC",
      component: (
        <EditNpc npcId={npcId} onSave={handleSave} onCancel={handleCancel} />
      ),
    });
  };

  return (
    <SearchCollection
      renderSidebar={function (query: string): ReactNode {
        return (
          <SearchResultsSection
            query={query}
            collection={lancerCollections.npcClasses}
            renderItem={(item) => (
              <SearchResultSidebarItem item={item} key={item.id} />
            )}
            label={<SearchResultLabel>NPC Classes</SearchResultLabel>}
            className="mb-3"
          />
        );
      }}
      renderMain={function (query: string): ReactNode {
        return (
          <SearchResultsSection
            query={query}
            collection={lancerCollections.npcClasses}
            renderItem={(item) => (
              <SearchResult id={item.id} key={item.id}>
                <NpcClassView
                  npcClass={item}
                  key={item.id}
                  actions={
                    <Button
                      className="text-sm"
                      color="green"
                      onClick={() => handleSelectNpcClass(item.id)}
                    >
                      Add to encounter
                    </Button>
                  }
                />
              </SearchResult>
            )}
            label={<SearchResultLabel>NPC Classes</SearchResultLabel>}
            className="mb-3"
          />
        );
      }}
    />
  );
}
