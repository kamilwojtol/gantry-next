import Task from "./task";

export type Kanban = {
  id: number;
  title: string;
  tasks: Task[] | [];
  tasksNumber: number;
  description: string;
};

export type CreatedKanban = {
  title: string;
  description: string;
};

export default Kanban;
