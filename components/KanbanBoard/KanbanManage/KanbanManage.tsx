import { Button, Divider } from "@mui/material";

export default function KanbanManage() {
  return (
    <div className="w-1/4 h-screen bg-blue-50">
      <div className="flex flex-col gap-2 mt-4">
        <Button>Add Task</Button>
        <Button>Remove Task</Button>
        <Divider />
        <Button>Manage Kanban</Button>
        <Button>Kanban Archive</Button>
        <Divider />
        <Button>Manage Users</Button>
      </div>
    </div>
  );
}
