"use client";

import { useState } from "react";
import KanbanSection from "./KanbanSection/KanbanSection";
import KanbanTask from "./KanbanTask/KanbanTask";
import { DragDropProvider, DragEndEvent } from "@dnd-kit/react";
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
  const [taskId, setTaskId] = useState<string>("");
  const tasks: TasksContainer = {
    todoTasks: [],
    progressTasks: [],
    doneTasks: [],
  };
  const { isPending, error, data } = useQuery<Kanban>({
    queryKey: ["kanbanBoard"],
    queryFn: () =>
      fetch("https://localhost:7224/api/kanban/1").then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: ({ taskId, newStatusCode }: ChangeTaskStatusParams) => {
      return fetch(
        `https://localhost:7224/api/kanban/1/changeTaskStatus/${taskId}?statusCode=${newStatusCode}`,
        {
          method: "PATCH",
        },
      );
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const mapTasks = () => {
    // requires optimisation
    tasks.todoTasks = data.tasks.filter((task) => {
      return task.status === StatusCode.TO_DO;
    });

    tasks.progressTasks = data.tasks.filter((task) => {
      return task.status === StatusCode.IN_PROGRESS;
    });

    tasks.doneTasks = data.tasks.filter((task) => {
      return task.status === StatusCode.DONE;
    });

    return (
      <div>
        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;

            const target = event.operation.source;
            setTaskId(target?.element?.id.toString() ?? "");
            console.log(target?.element);
            mutation.mutate({
              taskId: parseInt(taskId),
              newStatusCode: StatusCode.DONE,
            });
          }}
        >
          <KanbanSection title="To do" id="todo">
            {tasks.todoTasks &&
              tasks.todoTasks.map((todoTask) => (
                <KanbanTask
                  id={todoTask.status}
                  title={todoTask.name}
                  key={todoTask.id}
                  status={todoTask.status}
                />
              ))}
          </KanbanSection>
        </DragDropProvider>

        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;

            const target = event.operation.source;
            setTaskId(target?.element?.id.toString() ?? "");
            console.log(target?.element?.id);
            mutation.mutate({
              taskId: parseInt(taskId),
              newStatusCode: StatusCode.DONE,
            });
          }}
        >
          <KanbanSection title="In progress" id="in-progress">
            {tasks.progressTasks &&
              tasks.progressTasks.map((progressTask) => (
                <KanbanTask
                  id={progressTask.status}
                  title={progressTask.name}
                  key={progressTask.id}
                  status={progressTask.status}
                />
              ))}
          </KanbanSection>
        </DragDropProvider>

        <DragDropProvider
          onDragEnd={(event) => {
            if (event.canceled) return;

            const target = event.operation.source;
            setTaskId(target?.element?.id.toString() ?? "");
            console.log(target?.element?.id);
            mutation.mutate({
              taskId: parseInt(taskId),
              newStatusCode: StatusCode.DONE,
            });
          }}
        >
          <KanbanSection title="Done" id="done">
            {tasks.doneTasks &&
              tasks.doneTasks.map((doneTask) => (
                <KanbanTask
                  id={doneTask.status}
                  title={doneTask.name}
                  key={doneTask.id}
                  status={doneTask.status}
                />
              ))}
          </KanbanSection>
        </DragDropProvider>
      </div>
    );
  };

  return <div className="flex border border-black">{mapTasks()}</div>;
}
