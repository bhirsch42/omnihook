import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { selectPilotStats } from "../../store/pilots/selectors/selectPilotStats";

export function Grit({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const pilotStats = useAppSelector(selectPilotStats(pilotId));

  return (
    <div className={`flex ${className}`}>
      <div className="flex flex-col w-full">
        <div className="p-3 text-center bg-bgcolor-800">
          <div className="flex items-center justify-between">
            <div>
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-xl text-bgcolor-700"
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-xl text-bgcolor-700"
              />
            </div>
            <div className="mx-3 text-3xl">+{pilotStats.grit}</div>
            <div>
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-xl text-bgcolor-700"
              />
              <FontAwesomeIcon
                icon={faChevronLeft}
                className="text-xl text-bgcolor-700"
              />
            </div>
          </div>
          <div className="text">Grit</div>
        </div>
      </div>
    </div>
  );
}
