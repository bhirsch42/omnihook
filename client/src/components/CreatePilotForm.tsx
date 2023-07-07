import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { createPilotSchema, CreatePilot } from "../schemas/createPilot.schema";
import { useAppDispatch } from "../store/hooks";
import { createPilot } from "../store/pilots";

export function CreatePilotForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePilot>({
    resolver: zodResolver(createPilotSchema),
  });

  function handleCreatePilot(data: CreatePilot) {
    dispatch(createPilot(data));
  }

  return (
    <form
      className="p-3 w-80 border-2 border-bgcolor-700"
      onSubmit={handleSubmit(handleCreatePilot)}
    >
      <FormInput
        label="Pilot Name"
        className="mb-3"
        register={register}
        errors={errors}
        fieldName="name"
      />
      <FormInput
        label="Callsign"
        className="mb-4"
        register={register}
        errors={errors}
        fieldName="callsign"
      />
      <div className="flex justify-end">
        <Button type="submit">Register Pilot</Button>
      </div>
    </form>
  );
}
