import { isEmpty } from "ramda";
import { useCollections } from "../hooks/useCollections";
import { NpcTemplate } from "../schemas/lancerData/npcTemplate.schema";
import { NpcFeatureView } from "./NpcFeatureView";
import { UserText } from "./UserText";

export function NpcTemplateView({
  npcTemplate,
  className,
}: {
  npcTemplate: NpcTemplate;
  className?: string;
}) {
  const { npcFeatures } = useCollections();

  const baseFeatures = npcFeatures.findAll(npcTemplate.baseFeatures);
  const optionalFeatures = npcFeatures.findAll(npcTemplate.optionalFeatures);

  const hasBaseFeatures = !isEmpty(baseFeatures);
  const hasOptionalFeatures = !isEmpty(optionalFeatures);

  return (
    <div className={className}>
      <div className="text-lg font-bold">{npcTemplate.name}</div>

      <UserText text={npcTemplate.description} />

      {hasBaseFeatures && (
        <>
          <div className="font-bold mt-2">Base Features</div>
          <div className="flex items-start flex-wrap -mr-2 -mb-2 mt-1">
            {baseFeatures.map((npcFeature) => (
              <NpcFeatureView
                npcFeature={npcFeature}
                key={npcFeature.id}
                className="mr-2 mb-2 max-w-lg"
              />
            ))}
          </div>
        </>
      )}

      {hasOptionalFeatures && (
        <>
          <div className="font-bold mt-2">Optional Features</div>
          <div className="flex items-start flex-wrap -mr-2 -mb-2 mt-1">
            {optionalFeatures.map((npcFeature) => (
              <NpcFeatureView
                npcFeature={npcFeature}
                key={npcFeature.id}
                className="mr-2 mb-2 max-w-lg"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
