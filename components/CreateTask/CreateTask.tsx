"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, TextField, Divider } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useMutation } from "@tanstack/react-query";
import Task from "@/types/task";
import { useKanban } from "@/store/useKanban";

type CreateTaskProps = {
  title: string;
};

type Inputs = {
  taskName: string;
  taskDescription: string;
  taskAuthor: string;
  deadline: Dayjs | null;
};

export default function CreateTask({ title }: CreateTaskProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    createTaskMutation.mutate(data);

  const getKanbanId = useKanban((state) => state.kanban?.id ?? 1);

  const createTaskMutation = useMutation({
    mutationFn: (task) => {
      return fetch(
        `http://localhost:5142/api/kanban/${getKanbanId}/createTask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        },
      );
    },
  });

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
              defaultValue="Task name"
              {...register("taskName", {
                required: "Task name is required",
                minLength: {
                  value: 5,
                  message: "Name should be longer than 5 characters",
                },
              })}
              id="kanban-name"
              error={Boolean(errors.taskName)}
              helperText={errors.taskName?.message ?? ""}
              className="w-75"
            />
          </div>

          <div className="flex items-center gap-2 my-2">
            <label htmlFor="kanban-description" className="w-25">
              Description:
            </label>
            <TextField
              defaultValue="Description"
              {...register("taskDescription")}
              id="kanban-description"
              error={Boolean(errors.taskDescription)}
              className="w-75"
            />
          </div>

          <div className="flex items-center gap-2 my-2">
            <label htmlFor="kanban-author" className="w-25">
              Author:
            </label>
            <TextField
              defaultValue="Author"
              {...register("taskAuthor")}
              id="kanban-author"
              error={Boolean(errors.taskAuthor)}
              className="w-75"
            />
          </div>

          <div className="flex items-center gap-2 my-2">
            <label htmlFor="kanban-privacy">Task deadline:</label>
            <Controller
              name="deadline"
              control={control}
              rules={{
                required: "Deadline is required",
              }}
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Deadline"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  slotProps={{
                    textField: {
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              )}
            />
          </div>

          <Button type="submit" variant="contained">
            Add Task
          </Button>
        </form>
      </div>
    </div>
  );
}
