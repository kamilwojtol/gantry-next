"use client";

import SelectKanbanPage from "@/components/SelectKanban/SelectKanban";
import Kanban from "@/types/kanban";
import { useQuery } from "@tanstack/react-query";

export default function SelectKanban() {
  const { isPending, error, data } = useQuery<Kanban[]>({
    queryKey: ["kanbanBoard"],
    queryFn: () =>
      fetch("http://localhost:5142/api/kanban/").then((res) => res.json()),
  });

  if (isPending) {
    return <div>Loading kanban list...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <SelectKanbanPage title="Select Kanban" data={data} />
    </div>
  );
}
