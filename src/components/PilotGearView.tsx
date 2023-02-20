import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PilotGear } from "../schemas/lancerData/pilotGear.schema";
import { ActionsList } from "./ActionsList";

export function PilotGearView({ pilotGear }: { pilotGear: PilotGear }) {
  return (
    <div>
      <div className="font-bold">{pilotGear.name}</div>
      {/* <div className="grid grid-cols-[auto_auto_1fr] gap-x-3">
        <div className="flex items-center">
          <FontAwesomeIcon icon={faHeart} className="text-bgcolor-400" />
        </div>
        <div className="flex items-center">HP</div>
        <div className="flex items-center">{pilotGear}</div>
      </div> */}
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: pilotGear.description }}
      ></div>
      <ActionsList actions={pilotGear.actions} />
    </div>
  );
}
