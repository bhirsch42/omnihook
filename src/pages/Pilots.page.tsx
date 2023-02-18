import { CreatePilotForm } from "../components/CreatePilotForm";
import { Pilot } from "../schemas/pilot.schema";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAllPilots, setActivePilot } from "../store/pilotsSlice";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SelectPilot({ pilots }: { pilots: Pilot[] }) {
  const dispatch = useAppDispatch();

  function handleClick(id: string) {
    dispatch(setActivePilot(id));
  }

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-lg mb-5 text-center">// SELECT USER // </h1>
      {pilots.map((pilot) => (
        <button
          type="button"
          className="p-3 rounded bg-bgcolor-700 hover:bg-bgcolor-600 transition-colors flex items-center"
          onClick={() => handleClick(pilot.id)}
        >
          <FontAwesomeIcon icon={faCircleUser} className="text-5xl mr-3" />
          <div className="text-left">
            <div className="font-bold">{pilot.name}</div>
            <div className="text-sm">{pilot.callsign}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function Pilots() {
  const pilots = useAppSelector(selectAllPilots);

  if (pilots.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <CreatePilotForm />
      </div>
    );
  }

  return (
    <div className="flex justify-center mt-10">
      <SelectPilot pilots={pilots} />
    </div>
  );
}
