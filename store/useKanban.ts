import Kanban from "@/types/kanban";
import { create } from "zustand";

type KanbanStore = {
  kanban: Kanban | null;
  updateKanban: (newKanban: Kanban) => void;
};

export const useKanban = create<KanbanStore>((set) => ({
  kanban: null,
  updateKanban: (newKanban: Kanban) => set({ kanban: newKanban }),
}));
