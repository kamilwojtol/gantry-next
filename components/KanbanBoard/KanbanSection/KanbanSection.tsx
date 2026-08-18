import { useDroppable } from "@dnd-kit/react";

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
    id: id,
  });

  return (
    <div ref={ref} className="border border-black">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
