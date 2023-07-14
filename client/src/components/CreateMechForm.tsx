import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "./FormInput";
import { Button } from "./Button";
import {
  createMechFormSchema,
  CreateMech,
} from "../schemas/createMechForm.schema";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createMech } from "../store/mechs";
import { selectActivePilot } from "../store/pilots/selectors/selectActivePilot";
import { MechFrameInput } from "./MechFrameInput";
import { useCollections } from "../hooks/useCollections";

type CreateMechFormProps = {
  afterSubmit?: () => void;
};

export function CreateMechForm({ afterSubmit }: CreateMechFormProps) {
  const { id: pilotId } = useAppSelector(selectActivePilot);
  const dispatch = useAppDispatch();
  const collections = useCollections();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateMech>({
    resolver: zodResolver(createMechFormSchema),
    defaultValues: { pilotId },
  });

  const mechFrameId = watch("frameId");

  function handleSelectMechFrame(mechFrameId: string) {
    setValue("frameId", mechFrameId);
  }

  function handleCreateMech(data: CreateMech) {
    dispatch(
      createMech({
        name: data.name,
        pilotId: data.pilotId,
        frame: collections.mechFrames.find(data.frameId),
      })
    );
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

        <MechFrameInput
          pilotId={pilotId}
          onSelect={handleSelectMechFrame}
          value={mechFrameId}
        />

        {errors.frameId && (
          <div className="text-red-500 mb-3">You must select a mech frame</div>
        )}

        <div className="flex justify-end">
          <Button type="submit">Create Mech</Button>
        </div>
      </form>
    </div>
  );
}
