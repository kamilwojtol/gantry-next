"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Checkbox, TextField, Divider } from "@mui/material";

type CreateKanbanProps = {
  title: string;
};

type Inputs = {
  kanbanName: string;
  kanbanDescription: string;
  isPrivate: boolean;
};

export default function CreateKanban({ title }: CreateKanbanProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <div className="pl-4 py-2">
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      <Divider />
      <div className="pl-4 pt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors ? errors.form?.message : null}

          <div className="flex items-center gap-2 my-2">
            <label htmlFor="kanban-name" className="w-25">
              Name:
            </label>
            <TextField
              defaultValue="Kanban name"
              {...register("kanbanName", {
                required: "Kanban name is required",
                minLength: {
                  value: 5,
                  message: "Name should be longer than 5 characters",
                },
              })}
              id="kanban-name"
              error={Boolean(errors.kanbanName)}
              helperText={errors.kanbanName?.message ?? ""}
              className="w-75"
            />
          </div>

          <div className="flex items-center gap-2 my-2">
            <label htmlFor="kanban-description" className="w-25">
              Description:
            </label>
            <TextField
              defaultValue="Description"
              {...register("kanbanDescription")}
              id="kanban-description"
              error={Boolean(errors.kanbanDescription)}
              className="w-75"
            />
          </div>

          <div className="flex items-center gap-2 my-2">
            <label htmlFor="kanban-privacy">Private kanban:</label>
            <Checkbox
              defaultChecked={false}
              {...register("isPrivate")}
              id="kanban-privacy"
            />
          </div>

          <Button type="submit" variant="contained">
            Add Board
          </Button>
        </form>
      </div>
    </div>
  );
}
