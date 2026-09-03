import { StatusCode } from "@/types/statusCodes";
import { useSortable } from "@dnd-kit/react/sortable";

type KanbanTaskProps = {
  title: string;
  id: number;
  status: StatusCode;
  column: string;
  index: number;
};

export default function KanbanTask({
  title,
  id,
  status,
  column,
  index,
}: KanbanTaskProps) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "task",
    accept: "task",
    data: {
      column,
    },
    group: column,
  });
  return (
    <div
      className="flex bg-gray-50 rounded-xl px-3 py-2 mb-2 cursor-pointer"
      ref={ref}
      data-dragging={isDragging}
    >
      <h3>{title}</h3>
    </div>
  );
}
