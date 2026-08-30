"use client";

import { useState } from "react";
import KanbanSection from "./KanbanSection/KanbanSection";
import KanbanTask from "./KanbanTask/KanbanTask";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
import { useQuery } from "@tanstack/react-query";
import Kanban from "@/types/kanban";
import { StatusCode } from "@/types/statusCodes";
import Task from "@/types/task";

export default function KanbanBoard() {
  const [dropCategoryName, setDropCategoryName] = useState("");
  const { isPending, error, data } = useQuery<Kanban>({
    queryKey: ["kanbanBoard"],
    queryFn: () =>
      fetch("https://localhost:7224/api/kanban/1").then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const mapTasks = (tasks: Task[]) => {
    // requires optimisation
    const todoTasks = tasks.filter((task) => {
      return task.status === StatusCode.TO_DO;
    });

    const progressTasks = tasks.filter((task) => {
      return task.status === StatusCode.IN_PROGRESS;
    });

    const doneTasks = tasks.filter((task) => {
      return task.status === StatusCode.DONE;
    });

    return (
      <div>
        <KanbanSection title="To do" id="todo">
          {todoTasks &&
            todoTasks.map((todoTask) => (
              <KanbanTask
                id={todoTask.id.toString()}
                title={todoTask.name}
                key={todoTask.id}
              />
            ))}
        </KanbanSection>
        <KanbanSection title="In progress" id="in-progress">
          {progressTasks &&
            progressTasks.map((progressTask) => (
              <KanbanTask
                id={progressTask.id.toString()}
                title={progressTask.name}
                key={progressTask.id}
              />
            ))}
        </KanbanSection>
        <KanbanSection title="Done" id="done">
          {doneTasks &&
            doneTasks.map((doneTask) => (
              <KanbanTask
                id={doneTask.id.toString()}
                title={doneTask.name}
                key={doneTask.id}
              />
            ))}
        </KanbanSection>
      </div>
    );
  };

  return (
    <div className="flex border border-black">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const target = event.operation.target;
          setDropCategoryName(target?.id.toString() ?? "");
        }}
      >
        {mapTasks(data.tasks)}
      </DragDropProvider>
    </div>
  );
}
