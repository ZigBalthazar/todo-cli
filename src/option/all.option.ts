import { statusToEmoji } from "../common/convert";
import { readData } from "../common/fs";
import { TaskStatus } from "../enum/status.enum";
import { Tasks } from "../type/tasks.interface";
import chalk from "chalk";

export function all_option() {
  const tasks = readData<Tasks>();

  for (const taskKey in tasks.tasks) {
    const task = tasks.tasks[taskKey];
    console.log(
      `${statusToEmoji(task.status)} #${taskKey} ${
        task.status == TaskStatus.DONE
          ? chalk.strikethrough(task.title)
          : chalk.bold(task.title)
      }`
    );

    for (const subTaskKey in task.subTasks) {
      const subTask = task.subTasks[subTaskKey];
      const date = new Date(subTask.date * 1000);

      console.log(
        `       ${statusToEmoji(subTask.status)} ${chalk.magentaBright(
          subTaskKey
        )} ${
          subTask.status == TaskStatus.DONE
            ? chalk.strikethrough(subTask.title)
            : chalk.bold(subTask.title)
        }
            ${chalk.dim.italic(`date: ${date.toLocaleDateString()}`)}`
      );
    }
    console.log("\n");
  }
}
