import { SubTaskStatus } from "../enum/status";
import { SubTaskType } from "../type/subtask.type";

export interface ISubTask {
  print(): void;
  updateStatus(s: SubTaskStatus): void;
  toType(): SubTaskType;
}
