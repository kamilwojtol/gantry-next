import Task from "./task";

type Kanban = {
  id: number;
  title: string;
  tasks: Task[];
  tasksNumber: number;
};

export default Kanban;
