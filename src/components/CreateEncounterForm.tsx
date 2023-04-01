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

type CreateEncounterFormProps = {
  afterSubmit?: () => void;
};

export function CreateEncounterForm({ afterSubmit }: CreateEncounterFormProps) {
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
    afterSubmit && afterSubmit();
  }

  return (
    <div className="flex justify-center pt-3">
      <form className="w-80" onSubmit={handleSubmit(handleCreateEncounter)}>
        <FormInput
          label="Encounter Name"
          className="mb-3"
          register={register}
          errors={errors}
          fieldName="name"
          autoFocus
        />
        <div className="flex justify-end">
          <Button type="submit">Create Encounter</Button>
        </div>
      </form>
    </div>
  );
}
