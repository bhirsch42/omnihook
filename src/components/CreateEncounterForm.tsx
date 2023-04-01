import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import {
  createEncounterSchema,
  CreateEncounter,
} from "../schemas/createEncounter.schema";
import { useAppDispatch } from "../store/hooks";
import { createEncounter } from "../store/encounters";

export function CreateEncounterForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateEncounter>({
    resolver: zodResolver(createEncounterSchema),
  });

  function handleCreateEncounter(data: CreateEncounter) {
    dispatch(createEncounter(data));
  }

  return (
    <form
      className="p-3 w-80 border-2 border-bgcolor-700"
      onSubmit={handleSubmit(handleCreateEncounter)}
    >
      <FormInput
        label="Encounter Name"
        className="mb-3"
        register={register}
        errors={errors}
        fieldName="name"
      />
      <div className="flex justify-end">
        <Button type="submit">Create Encounter</Button>
      </div>
    </form>
  );
}
