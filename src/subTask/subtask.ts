import chalk from "chalk";
import { SubTaskStatus } from "./enum/status";
import { ISubTask } from "./interface/subtask.interface";
import { SubTaskType } from "./type/subtask.type";

export class SubTask implements ISubTask {
  id: string;
  title: string;
  status: SubTaskStatus;
  date: number;

  constructor(subTask: SubTaskType) {
    this.id = subTask.id;
    this.title = subTask.title;
    this.status = subTask.status;
    this.date = subTask.date;
  }

  public print(): void {
    const date = new Date(this.date * 1000);

    console.log(
      `       ${this.statusToEmoji(this.status)} ${chalk.magentaBright(
        this.id
      )} ${
        this.status == SubTaskStatus.DONE
          ? chalk.strikethrough(this.title)
          : chalk.bold(this.title)
      }
            ${chalk.dim.italic(`date: ${date.toLocaleDateString()}`)}`
    );
  }

  updateStatus(s: SubTaskStatus) {
    this.status = s;
  }

  toType(): SubTaskType {
    return {
      date: this.date,
      id: this.id,
      status: this.status,
      title: this.title,
    };
  }

  private statusToEmoji(s: SubTaskStatus): string {
    console.log;
    switch (s) {
      case SubTaskStatus.PENDING:
        return `⏳`;
      case SubTaskStatus.IN_PROGRESS:
        return `🚧`;
      case SubTaskStatus.DONE:
        return `✅`;
      default:
        return "❓";
    }
  }
}
