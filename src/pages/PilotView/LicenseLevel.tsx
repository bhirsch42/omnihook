import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPilot } from "../../store/pilots/selectors/selectPilot";
import { Button } from "../../components/Button";
import { incrementLicenseLevel } from "../../store/pilots";

export function LicenseLevel({
  pilotId,
  className,
}: {
  pilotId: string;
  className?: string;
}) {
  const dispatch = useAppDispatch();
  const pilot = useAppSelector(selectPilot(pilotId));

  function handleClickLevelUp() {
    dispatch(incrementLicenseLevel(pilotId));
  }

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
                className="text-2xl text-bgcolor-700"
              />
            </div>
            <div className="text-3xl">{pilot.licenseLevel}</div>
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
          <div className="text">License Level</div>
        </div>
        <Button
          onClick={handleClickLevelUp}
          className="flex items-center justify-center text-xs rounded-none"
        >
          <div className="mr-2">Level Up</div>{" "}
          <FontAwesomeIcon icon={faArrowUp} className="text-bgcolor-400" />
        </Button>
      </div>
    </div>
  );
}
