import chalk from "chalk";
import { readData, writeData } from "../common/fs";
import { TasksType, TaskType } from "../task/type/task.type";
import { Task } from "../task/task";
import { TaskStatus } from "../task/enum/status.enum";
import { SubTaskStatus } from "../subTask/enum/status";

export function taskCommand(taskId: string | boolean) {
  const tasks = readData<TasksType>();

  if (!taskId) {
    console.log(chalk.blue.bold("🗂️ List of All Tasks:"));
    for (const taskKey in tasks.tasks) {
      const task = new Task(tasks.tasks[taskKey]);
      task.print(true);
    }
  } else {
    const t = tasks.tasks[taskId as string];
    if (!t) {
      console.log(chalk.red.bold("Error:") + " " + chalk.yellow(`Task with ID ${chalk.green(taskId as string)} not found.`));
      return;
    }

    const task = new Task(t);
    task.print(false);
  }
}

export function taskCommandWithNewOption(title: string) {
  const tasks = readData<TasksType>();
  const id = (+tasks.lastTaskId + 1).toString();
  const newTask: TaskType = {
    id: id,
    status: TaskStatus.PENDING,
    subTasks: {},
    title: title,
    lastSubTaskId: "0",
  };

  tasks.tasks[id] = newTask;
  tasks.lastTaskId = id;

  writeData<TasksType>(tasks);
}

export function taskCommandWithRemoveOption(taskId: string) {
  const tasks = readData<TasksType>();

  const task = tasks.tasks[taskId];
  if (!task) {
    console.log(chalk.red.bold("Error:") + " " + chalk.yellow(`Task with ID ${chalk.green(taskId as string)} not found.`));
  }

  delete tasks.tasks[taskId];

  writeData<TasksType>(tasks);
}

export function taskCommandWithSubTaskOption(taskId: string, subTaskTitle: any) {
  const tasks = readData<TasksType>();
  const task = tasks.tasks[taskId];
  if (!task) {
    console.log(chalk.red.bold("Error:") + " " + chalk.yellow(`Task with ID ${chalk.green(taskId as string)} not found.`));
  }
  const lastSubTaskId = tasks.tasks[taskId].lastSubTaskId;
  const id = taskId +"-"+ (+lastSubTaskId + 1).toString();
  const currentDate = new Date();
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000);

  tasks.tasks[taskId].subTasks[id] = {
    id: id,
    title: subTaskTitle,
    status: SubTaskStatus.PENDING,
    date: unixTimestamp,
  };

  writeData<TasksType>(tasks);
}
