"use client";

import { useForm, SubmitHandler } from "react-hook-form";

type CreateKanbanProps = {
  title: string;
};

type Inputs = {
  example: string;
  exampleRequired: string;
};

export default function CreateKanban({ title }: CreateKanbanProps) {
  const {
    register,
    handleSubmit,
    watch,
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
          <input />
        </form>
      </div>
    </div>
  );
}
