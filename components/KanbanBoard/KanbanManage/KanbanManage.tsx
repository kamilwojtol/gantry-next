import { Button, Divider } from "@mui/material";
import Link from "next/link";

export default function KanbanManage() {
  return (
    <div className="w-1/4 h-screen bg-blue-50">
      <div className="flex flex-col gap-2 mt-4">
        <Button>
          <Link href="/create-task">Add Task</Link>
        </Button>
        <Button>Remove Task</Button>
        <Divider />
        <Button>Manage Kanban</Button>
        <Button>Kanban Archive</Button>
        <Divider />
        <Button>Manage Users</Button>
        <Button>
          <Link href="/create-kanban">Create New Kanban</Link>
        </Button>
      </div>
    </div>
  );
}
