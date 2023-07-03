import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import { createMechSchema, CreateMech } from "../schemas/createMech.schema";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createMech } from "../store/mechs";
import { selectActivePilot } from "../store/pilots/selectors/selectActivePilot";

type CreateMechFormProps = {
  afterSubmit?: () => void;
};

export function CreateMechForm({ afterSubmit }: CreateMechFormProps) {
  const { id: pilotId } = useAppSelector(selectActivePilot);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMech>({
    resolver: zodResolver(createMechSchema),
    defaultValues: { pilotId },
  });

  console.log("CreateMechForm");

  function handleCreateMech(data: CreateMech) {
    dispatch(createMech(data));
    afterSubmit && afterSubmit();
  }

  return (
    <div className="flex justify-center pt-3">
      <form className="w-80" onSubmit={handleSubmit(handleCreateMech)}>
        <FormInput
          label="Mech Name"
          className="mb-3"
          register={register}
          errors={errors}
          fieldName="name"
          autoFocus
        />
        {pilotId}
        {JSON.stringify(errors)}
        <div className="flex justify-end">
          <Button type="submit">Create Mech</Button>
        </div>
      </form>
    </div>
  );
}
