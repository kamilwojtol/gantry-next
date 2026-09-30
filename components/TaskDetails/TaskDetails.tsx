import { Button } from "@mui/material";

type TaskDetailsProps = {
  name: string;
  description: string;
  author: string;
};

const TaskDetails = ({ name, description, author }: TaskDetailsProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
      <p>{author}</p>
      <Button variant="contained">Delete</Button>
    </div>
  );
};

export default TaskDetails;
