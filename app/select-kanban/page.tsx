"use client";

import Kanban from "@/types/kanban";
import { useQuery } from "@tanstack/react-query";
import { List, ListItem } from "@mui/material";
import { useKanban } from "@/store/useKanban";
import { useRouter } from "next/navigation";

export default function SelectKanban() {
  const updateKanban = useKanban((state) => state.updateKanban);

  const { isPending, error, data } = useQuery<Kanban[]>({
    queryKey: ["kanbanBoard"],
    queryFn: () =>
      fetch("http://localhost:5142/api/kanban/").then((res) => res.json()),
  });

  const router = useRouter();

  function selectAndRedirectKanban(kanban: Kanban) {
    updateKanban(kanban);
    router.push("/");
  }

  if (isPending) {
    return <div>Loading kanban list...</div>;
  }

  if (error) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <List>
        {data?.map((kanban) => {
          return (
            <ListItem className="cursor-pointer" key={kanban.id}>
              <button onClick={() => selectAndRedirectKanban(kanban)}>
                {kanban.title}
              </button>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
