import { lancerCollections } from "../data/lancerData";
import { Frame } from "../schemas/lancerData/frame.schema";
import { Trait } from "../schemas/lancerData/trait.schema";
import { MechFrameStatsView } from "./MechFrameStatsView";
import { TraitView } from "./TraitView";
import { UserText } from "./UserText";

type MechFrameViewProps = {
  mechFrame: Frame;
};

function ImageCol({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col">
      <div className="relative flex flex-col items-center justify-center ml-3 min-h-lg isolate">
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center opacity-50 -z-10">
          <div className="rotate-45 w-40 h-40 @3xl:w-60 @3xl:h-60 bg-bgcolor-700"></div>
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center -z-10 opacity-30">
          <div className="rotate-45 border-4 w-44 h-44 @3xl:w-72 @3xl:h-72 border-bgcolor-700 max-h-full"></div>
        </div>
        <img className="w-full max-w-md" src={imageUrl} alt="" />
      </div>
    </div>
  );
}

export function MechFrameView({ mechFrame }: MechFrameViewProps) {
  const { name, description, imageUrl, source, traits } = mechFrame;
  const manufacturer = lancerCollections.manufacturers.find(source);

  return (
    <div className="@container">
      <div className="flex mb-2 text-lg font-bold">
        <div>{name}</div>
        <div className="pl-3 ml-3 border-l-4 text-bgcolor-400 border-l-bgcolor-700">
          {manufacturer.name}
        </div>
        <div className="pl-3 ml-3 italic border-l-4 text-bgcolor-400 border-l-bgcolor-700">
          {mechFrame.mechType.join(", ")}
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-[auto_1fr] gap-3 @5xl:grid-rows-1 @5xl:grid-cols-[auto_1fr_auto]">
        <div className="flex flex-col">
          <MechFrameStatsView
            mechFrame={mechFrame}
            className="px-3 py-2 border border-bgcolor-700"
          />
        </div>
        <div className="row-span-2">
          <UserText text={description} className="text-sm" />
          <div>
            {traits.map((trait) => (
              <TraitView trait={trait} key={trait.name} className="mt-2" />
            ))}
          </div>
        </div>
        <ImageCol imageUrl={imageUrl} />
      </div>
    </div>
  );
}
