"use client";
import Task from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { useKanban } from "@/store/useKanban";

import { Button } from "@mui/material";

type TaskDetailsProps = {
  id: string;
};

const TaskDetails = ({ id }: TaskDetailsProps) => {
  const kanbanId = useKanban((state) => state.kanban?.id ?? 1);

  const { isPending, error, data } = useQuery<Task>({
    queryKey: ["task", kanbanId, id],
    queryFn: async () => {
      const response = await fetch(
        `https://gantry-btaedmegevfabtdp.westcentralus-01.azurewebsites.net/api/kanban/${kanbanId}/getTask/${id}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to load task (${response.status})`);
      }

      return response.json();
    },
  });

  if (isPending) return <p>Loading task...</p>;

  if (error) return <p>Failed to load task: {error.message}</p>;

  return (
    <div>
      <h2>{data?.name}</h2>
      <p>{data?.description}</p>
      <p>{data?.author}</p>
      <Button variant="contained">Delete</Button>
    </div>
  );
};

export default TaskDetails;
