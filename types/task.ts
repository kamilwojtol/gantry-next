import { StatusCode } from "./statusCodes";

type Task = {
  id: number;
  author: string;
  createdData: Date;
  deadline: Date;
  description: string;
  status: StatusCode;
  name: string;
};

export default Task;
