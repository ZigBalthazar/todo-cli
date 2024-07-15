import { SubTaskType } from "../../subTask/type/subtask.type";
import { TaskStatus } from "../enum/status.enum";

export interface TaskType {
  id: string;
  title: string;
  status: TaskStatus;
  lastSubTaskId: string;
  subTasks: Record<string, SubTaskType>;
}

export interface TasksType {
  lastTaskId: string;
  tasks: Record<string, TaskType>;
}
