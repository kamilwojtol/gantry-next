"use client";

import { useKanban } from "@/store/useKanban";
import Kanban from "@/types/kanban";
import { Divider, List, ListItem } from "@mui/material";
import { useRouter } from "next/navigation";

type SelectKanbanProps = {
  title: string;
  data: Kanban[];
};

export default function SelectKanbanPage({ title, data }: SelectKanbanProps) {
  const updateKanban = useKanban((state) => state.updateKanban);

  const router = useRouter();

  function selectAndRedirectKanban(kanban: Kanban) {
    updateKanban(kanban);
    router.push("/");
  }

  return (
    <div>
      <div className="pl-4 py-2">
        <h2 className="text-xl font-medium">{title}</h2>
      </div>
      <Divider />
      <div className="pl-4 pt-2">
        <List>
          {data.length &&
            data?.map((kanban) => {
              return (
                <ListItem className="cursor-pointer px-4 py-2" key={kanban.id}>
                  <button onClick={() => selectAndRedirectKanban(kanban)}>
                    {kanban.title}
                  </button>
                </ListItem>
              );
            })}
        </List>
      </div>
    </div>
  );
}
