import { Frame } from "../schemas/lancerData/frame.schema";

type MechFrameViewProps = {
  mechFrame: Frame;
};

function ImageCol({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="flex flex-col">
      <div className="relative isolate flex">
        <div className="h-96"></div> {/* make sure container is tall enough */}
        <div className="absolute top-0 left-0 bottom-0 right-0 flex items-center justify-center -z-10 opacity-50">
          <div className="w-96 h-96 bg-bgcolor-700 rounded-full"></div>
        </div>
        <img className="max-w-md" src={imageUrl} alt="" />
      </div>
    </div>
  );
}

function MechFrameStats({ mechFrame }: { mechFrame: Frame }) {
  return <div>Stats</div>;
}

export function MechFrameView({ mechFrame }: MechFrameViewProps) {
  const { name, description, imageUrl } = mechFrame;
  return (
    <div>
      <div className="text-lg font-bold">{name}</div>
      <div className="grid grid-cols-[auto_auto] gap-3">
        <div>
          <MechFrameStats mechFrame={mechFrame} />
          <div
            className="text-sm"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>

        <ImageCol imageUrl={imageUrl} />
      </div>
    </div>
  );
}
