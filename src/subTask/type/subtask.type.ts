import { SubTaskStatus } from "../enum/status";

export type SubTaskType = {
  id: string;
  title: string;
  status: SubTaskStatus;
  date: number;
};
