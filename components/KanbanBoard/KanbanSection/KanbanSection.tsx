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
    <div ref={ref} className="mr-4 min-w-[250px]">
      <h2 className="text-xl px-2">{title}</h2>
      <div className="bg-slate-200 w-full rounded-xl px-2 py-2 min-h-[500px]">
        {children}
      </div>
    </div>
  );
}
