import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";

export function Grit({ pilotId }: { pilotId: string }) {
  const pilotStats = useAppSelector(selectPilotStats(pilotId));

  return (
    <div className="flex">
      <div className="flex flex-col">
        <div className="bg-bgcolor-800 text-center p-3">
          <div className="flex justify-between items-center">
            <div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-2xl text-bgcolor-700"
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-2xl text-bgcolor-700"
              />
            </div>
            <div className="text-4xl mx-3">+{pilotStats.grit}</div>
            <div>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-2xl text-bgcolor-700"
              />
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-2xl text-bgcolor-700"
              />
            </div>
          </div>
          <div className="text">Grit</div>
        </div>
      </div>
    </div>
  );
}
