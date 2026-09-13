import { StatusCode } from "./statusCodes";

type Task = {
  id: number;
  author: string;
  createdData: Date;
  deadline: Date;
  description: string;
  statusCode: StatusCode;
  name: string;
};

export default Task;
