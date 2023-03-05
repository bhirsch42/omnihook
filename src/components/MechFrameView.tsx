import { Frame } from "../schemas/lancerData/frame.schema";
import { MechFrameStatsView } from "./MechFrameStatsView";

type MechFrameViewProps = {
  mechFrame: Frame;
};

function ImageCol({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="float-right relative isolate flex ml-3">
      <div className="h-96"></div> {/* make sure container is tall enough */}
      <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center -z-10 opacity-50">
        <div className="w-60 h-60 bg-bgcolor-700 rotate-45"></div>
      </div>
      <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center -z-10 opacity-30">
        <div className="w-72 h-72 border-4 border-bgcolor-700 rotate-45"></div>
      </div>
      <img className="max-w-md" src={imageUrl} alt="" />
    </div>
  );
}

export function MechFrameView({ mechFrame }: MechFrameViewProps) {
  const { name, description, imageUrl } = mechFrame;
  return (
    <div>
      <div className="text-lg font-bold">{name}</div>
      <div className="grid grid-cols-[auto_auto] gap-3">
        <div>
          <MechFrameStatsView mechFrame={mechFrame} />
          <ImageCol imageUrl={imageUrl} />
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    </div>
  );
}
