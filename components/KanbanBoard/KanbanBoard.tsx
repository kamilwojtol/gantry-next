"use client";

import { useState } from "react";
import KanbanSection from "./KanbanSection/KanbanSection";
import KanbanTask from "./KanbanTask/KanbanTask";
import { DragDropProvider } from "@dnd-kit/react";

export default function KanbanBoard() {
  const [dropCategoryName, setDropCategoryName] = useState("");

  return (
    <div className="flex border border-black">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const target = event.operation.target;
          setDropCategoryName(target?.id.toString() ?? "");
        }}
      >
        <KanbanSection title="To do" id="todo">
          {dropCategoryName !== "in-progress" &&
            dropCategoryName !== "done" && (
              <KanbanTask title="Master React & .NET" id="master" />
            )}
        </KanbanSection>
        <KanbanSection title="In progress" id="in-progress">
          {dropCategoryName == "in-progress" && (
            <KanbanTask title="Master React & .NET" id="master" />
          )}
        </KanbanSection>
        <KanbanSection title="Done" id="done">
          {dropCategoryName == "done" && (
            <KanbanTask title="Master React & .NET" id="master" />
          )}
        </KanbanSection>
      </DragDropProvider>
    </div>
  );
}
