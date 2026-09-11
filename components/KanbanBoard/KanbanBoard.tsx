"use client";

import { useEffect, useState } from "react";
import KanbanSection from "./KanbanSection/KanbanSection";
import KanbanTask from "./KanbanTask/KanbanTask";
import { DragDropProvider } from "@dnd-kit/react";
import { move } from "@dnd-kit/helpers";
import { useMutation, useQuery } from "@tanstack/react-query";
import Kanban from "@/types/kanban";
import { StatusCode } from "@/types/statusCodes";
import Task from "@/types/task";

type TasksContainer = {
  todoTasks: Task[];
  progressTasks: Task[];
  doneTasks: Task[];
};

type ChangeTaskStatusParams = {
  taskId: number;
  newStatusCode: number;
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<TasksContainer>({
    todoTasks: [],
    progressTasks: [],
    doneTasks: [],
  });
  const { isPending, error, data } = useQuery<Kanban>({
    queryKey: ["kanbanBoard"],
    queryFn: () =>
      fetch("http://localhost:5142/api/kanban/6").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: ({ taskId, newStatusCode }: ChangeTaskStatusParams) => {
      return fetch(
        `http://localhost:5142/api/kanban/6/changeTaskStatus/${taskId}?statusCode=${newStatusCode}`,
        {
          method: "PATCH",
        },
      );
    },
  });

  useEffect(() => {
    if (!data) return;

    const groupedTasks: TasksContainer = {
      todoTasks: [],
      progressTasks: [],
      doneTasks: [],
    };

    data.tasks.forEach((task) => {
      switch (task.status) {
        case StatusCode.TO_DO:
          groupedTasks.todoTasks.push(task);
          break;
        case StatusCode.IN_PROGRESS:
          groupedTasks.progressTasks.push(task);
          break;
        case StatusCode.DONE:
          groupedTasks.doneTasks.push(task);
          break;
      }
    });

    setTasks(groupedTasks);
  }, [data]);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const boardColumns = Object.entries(tasks) as [
    keyof TasksContainer,
    Task[],
  ][];

  return (
    <DragDropProvider
      onDragOver={(event) => {
        setTasks((tasks) => move(tasks, event));
      }}
      onDragEnd={(event) => {
        if (event.canceled) return;

        const sourceTaskId = event.operation.source?.id;
        const targetColumn = event.operation.target?.data?.column as
          | keyof TasksContainer
          | undefined;

        if (typeof sourceTaskId !== "number" || !targetColumn) return;

        const statusByColumn: Record<keyof TasksContainer, StatusCode> = {
          todoTasks: StatusCode.TO_DO,
          progressTasks: StatusCode.IN_PROGRESS,
          doneTasks: StatusCode.DONE,
        };

        mutation.mutate({
          taskId: sourceTaskId,
          newStatusCode: statusByColumn[targetColumn],
        });
      }}
    >
      <div className="flex justify-center border-radius-5 w-full m-2">
        {boardColumns.map(([column, columnTasks]) => (
          <KanbanSection key={column} id={column} title={column}>
            {columnTasks.map((task, index) => (
              <KanbanTask
                title={task.name}
                id={task.id}
                status={task.status}
                key={task.id}
                column={column}
                index={index}
              />
            ))}
          </KanbanSection>
        ))}
      </div>
    </DragDropProvider>
  );
}
