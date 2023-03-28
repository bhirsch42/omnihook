import { isEmpty } from "ramda";
import { useCollections } from "../hooks/useCollections";
import { NpcClass } from "../schemas/lancerData/npcClass.schema";
import { NpcFeatureView } from "./NpcFeatureView";
import { UserText } from "./UserText";

export function NpcClassView({
  npcClass,
  className,
}: {
  npcClass: NpcClass;
  className?: string;
}) {
  const { npcFeatures } = useCollections();

  const baseFeatures = npcFeatures.findAll(npcClass.baseFeatures);
  const optionalFeatures = npcFeatures.findAll(npcClass.optionalFeatures);

  const hasBaseFeatures = !isEmpty(baseFeatures);
  const hasOptionalFeatures = !isEmpty(optionalFeatures);

  return (
    <div className={className}>
      {/* <div className="text-lg font-bold">{npcClass.name}</div> */}
      <div className="flex mb-2 text-lg font-bold">
        <div>{npcClass.name}</div>
        <div className="pl-3 ml-3 border-l-4 text-bgcolor-400 border-l-bgcolor-700 capitalize italic">
          {npcClass.role}
        </div>
      </div>

      <UserText text={npcClass.info.flavor} className="text-sm" />

      <div className="font-bold mt-2">Tactics</div>
      <UserText text={npcClass.info.tactics} className="text-sm" />

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
