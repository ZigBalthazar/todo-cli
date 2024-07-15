import { TaskStatus } from "../enum/status.enum";

export interface Task {
  title: string;
  status: TaskStatus;
  subTasks: Record<string, SubTask>;
}

export interface SubTask {
  title: string;
  status: TaskStatus;
  date: number;
}

export interface Tasks {
  tasks: Record<string, Task>;
}