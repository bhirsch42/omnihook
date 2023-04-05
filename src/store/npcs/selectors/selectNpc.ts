import { RootState } from "../..";
import { NpcClass } from "../../../schemas/lancerData/npcClass.schema";
import { NpcTemplate } from "../../../schemas/lancerData/npcTemplate.schema";
import { Npc } from "../../../schemas/npc.schema";

export type DenormalizedNpc = Omit<Npc, "classId"> & {
  class: NpcClass;
  template?: NpcTemplate;
};

export const selectNpc =
  (id: string) =>
  (state: RootState): DenormalizedNpc => {
    const npc = state.npcs.all.find((o) => o.id === id);
    if (!npc) throw new Error(`Could not find npc with id: ${id}`);

    const npcClass = state.collections.npcClasses.find(
      (o) => o.id === npc.classId
    );

    if (!npcClass)
      throw new Error(`Could not find npcClass with id: ${npc.classId}`);

    const npcTemplate = state.collections.npcTemplates.find(
      (o) => o.id === npc.templateId
    );

    if (npc.templateId && !npcTemplate)
      throw new Error(`Could not find npcTemplate with id: ${npc.templateId}`);

    return { ...npc, class: npcClass, template: npcTemplate };
  };
