import chalk from "chalk";
import { ISubTask } from "../subTask/interface/subtask.interface";
import { TaskStatus } from "./enum/status.enum";
import { ITask } from "./interface/task.interface";
import { TaskType } from "./type/task.type";
import { SubTask } from "../subTask/subtask";
import { SubTaskType } from "../subTask/type/subtask.type";

export class Task implements ITask {
  id: string;
  title: string;
  status: TaskStatus;
  lastSubTaskIs: string;
  private subTasks: Record<string, ISubTask> = {};

  constructor(task: TaskType) {
    this.id = task.id;
    this.title = task.title;
    this.status = task.status;
    this.lastSubTaskIs = task.lastSubTaskId;

    for (const key in task.subTasks) {
      const subtask = task.subTasks[key];
      this.subTasks[key] = new SubTask(subtask);
    }
  }

  print(onlyTitle: boolean): void {
    console.log(
      `${this.statusToEmoji(this.status)} ${chalk.magentaBright(this.id)} ${
        this.status == TaskStatus.DONE ? chalk.strikethrough(this.title) : chalk.bold(this.title)
      }`
    );

    if (onlyTitle) {
      return;
    }

    for (const subTaskKey in this.subTasks) {
      const subTask = this.subTasks[subTaskKey];
      subTask.print();
    }
  }

  subTask(id: string): ISubTask {
    return this.subTasks[id];
  }

  toType(): TaskType {
    const a: Record<string, SubTaskType> = {};
    for (const z in this.subTasks) {
      a[z] = this.subTask(z).toType();
    }

    return {
      id: this.id,
      status: this.status,
      subTasks: a,
      title: this.title,
      lastSubTaskId: this.lastSubTaskIs,
    };
  }

  private statusToEmoji(s: TaskStatus): string {
    console.log;
    switch (s) {
      case TaskStatus.PENDING:
        return `⏳`;
      case TaskStatus.IN_PROGRESS:
        return `🚧`;
      case TaskStatus.DONE:
        return `✅`;
      default:
        return "❓";
    }
  }
}
