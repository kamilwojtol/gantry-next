import { useDroppable } from "@dnd-kit/react";
import { CollisionPriority } from "@dnd-kit/abstract";

type KanbanSectionProps = {
  title: string;
  id: string;
  children: React.ReactNode;
};

export default function KanbanSection({
  title,
  id,
  children,
}: KanbanSectionProps) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: "task",
    data: {
      column: id,
    },
    collisionPriority: CollisionPriority.Low,
  });

  return (
    <div ref={ref} className="border border-black">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
