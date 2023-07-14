import { CreatePilotForm } from "../components/CreatePilotForm";
import { Pilot } from "../schemas/pilot.schema";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setActivePilot } from "../store/pilots";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectAllPilots } from "../store/pilots/selectors/selectAllPilots";
import { useRouter } from "@tanstack/react-router";

export function SelectPilot({ pilots }: { pilots: Pilot[] }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleClick(id: string) {
    dispatch(setActivePilot(id));
    router.navigate({ to: "/" });
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

export function ChoosePilot() {
  const pilots = useAppSelector(selectAllPilots);

  if (pilots.length === 0) {
    return (
      <div className="flex justify-center h-screen items-center">
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
