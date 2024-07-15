import chalk from "chalk";
import { readData } from "../common/fs";
import { Task } from "../task/task";
import { TasksType } from "../task/type/task.type";

export function allCommand() {
  const tasks = readData<TasksType>();

  if (Object.keys(tasks.tasks).length === 0) {
    console.log(chalk.red.bold("No tasks found!"));
    return;
  }

  console.log(chalk.blue.bold("🗂️ List of All Tasks:"));

  for (const taskKey in tasks.tasks) {
    const task = new Task(tasks.tasks[taskKey]);
    task.print(false);
  }
}
