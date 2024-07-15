import { readData, writeData } from "../common/fs";
import { SubTaskStatus } from "../subTask/enum/status";
import { Task } from "../task/task";
import { TasksType } from "../task/type/task.type";
import chalk from "chalk";

export function updateCommand(s: string, status: SubTaskStatus) {
  const taskId = s.split("-")[0];

  if (!(status in SubTaskStatus)) {
    console.log(chalk.red.bold("Error:") + " " + chalk.yellow("Invalid status provided. Please use one of the following statuses:"));
    console.log(
      Object.values(SubTaskStatus)
        .map((st) => chalk.green(st))
        .join(", ")
    );
    return;
  }

  const tasks = readData<TasksType>();

  const targetTask = tasks.tasks[taskId];

  if (!targetTask) {
    console.log(chalk.red.bold("Error:") + " " + chalk.yellow(`Task with ID ${chalk.green(taskId)} not found.`));
    return;
  }
  const task = new Task(targetTask);

  const subtask = task.subTask(s);
  if (!subtask) {
    console.log(chalk.red.bold("Error:") + " " + chalk.yellow(`Subtask with ID ${chalk.green(s)} not found in task ${chalk.green(taskId)}.`));
    return;
  }

  subtask.updateStatus(status);

  tasks.tasks[taskId] = task.toType();

  writeData(tasks);

  console.log(chalk.green(`Success: Subtask ${chalk.blue(s)} status updated to ${chalk.blue(status)}.`));
}
