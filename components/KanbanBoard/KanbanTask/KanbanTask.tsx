import { StatusCode } from "@/types/statusCodes";
import { useDraggable } from "@dnd-kit/react";

type KanbanTaskProps = {
  title: string;
  id: number;
  status: StatusCode;
};

export default function KanbanTask({ title, id, status }: KanbanTaskProps) {
  const { ref } = useDraggable({
    id: id,
  });

  return (
    <div ref={ref} id={id.toString()}>
      <h3>{title}</h3>
    </div>
  );
}
