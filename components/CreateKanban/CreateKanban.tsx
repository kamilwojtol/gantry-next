"use client";

import { useForm, SubmitHandler } from "react-hook-form";

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
      <div>
        <h2>Add Kanban Board</h2>
      </div>
      <div>
        <form action="POST" onSubmit={handleSubmit(onSubmit)}>
          {errors ? errors.form?.message : null}

          <label htmlFor="kanban-name" className="flex">
            Enter kanban name:
            <input
              defaultValue="Enter kanban name"
              {...register("kanbanName", {
                required: true,
                minLength: 5,
              })}
              id="kanban-name"
              name="kanban-name"
            />
          </label>

          <label htmlFor="kanban-description" className="flex">
            Enter kanban name:
            <input
              defaultValue="Enter kanban description"
              {...register("kanbanDescription")}
              id="kanban-name"
              name="kanban-name"
            />
          </label>

          <label htmlFor="kanban-privacy" className="flex">
            Private kanban:
            <input
              defaultValue=""
              {...register("isPrivate")}
              id="kanban-privacy"
              name="kanban-privacy"
              type="select"
            />
          </label>

          <input type="submit" />
        </form>
      </div>
    </div>
  );
}
