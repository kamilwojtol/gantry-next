"use client";

import { use } from "react";
import TaskDetails from "@/components/TaskDetails/TaskDetails";

export default function TaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return (
    <div>
      <h1>Task Details</h1>
      <TaskDetails id={id} />
    </div>
  );
}
