import { useDraggable } from "@dnd-kit/react";

type KanbanTaskProps = {
  title: string;
  id: string;
};

export default function KanbanTask({ title, id }: KanbanTaskProps) {
  const { ref } = useDraggable({
    id: id,
  });

  return (
    <div ref={ref}>
      <h3>{title}</h3>
    </div>
  );
}
