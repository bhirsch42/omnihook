import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { Button } from "../../components/Button";

export function LicenseLevel({ pilotId }: { pilotId: string }) {
  const pilot = useAppSelector(selectPilot(pilotId));
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
            <div className="text-4xl">{pilot.licenseLevel}</div>
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
          <div className="text">License Level</div>
        </div>
        <Button className="text-xs rounded-none flex items-center justify-center">
          <div className="mr-2">Level Up</div>{" "}
          <FontAwesomeIcon icon={faArrowUp} className="text-bgcolor-400" />
        </Button>
      </div>
    </div>
  );
}
