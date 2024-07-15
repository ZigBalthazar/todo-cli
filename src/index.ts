import figlet from "figlet";
import { Command } from "commander";
import chalk from "chalk";
import { allCommand } from "./command/all.command";
import { taskCommand, taskCommandWithNewOption, taskCommandWithRemoveOption, taskCommandWithSubTaskOption } from "./command/task.command";
import { updateCommand } from "./command/update.command";
import { SubTaskStatus } from "./subTask/enum/status";

// Console banner
// console.log(figlet.textSync("TODO CLI", "4Max"), "\n");

const program = new Command();

// Global options
program.version("1.0.0").description("Simple TODO CLI");

// Command: update
program
  .command("update <subTask_id> <status>")
  .description("Update subTask status")
  .action((subTask_id: string, status: SubTaskStatus) => {
    updateCommand(subTask_id, status);
  });

// Command: all
program
  .command("all")
  .description("See list of all tasks with details (subTasks, date, status, etc.)")
  .action(() => {
    console.log(chalk.blue.bold("🗂️ List of All Tasks:"));
    allCommand();
  });

// Command: task
program
  .command("task [task_id]")
  .description("See detail of task or tasks")
  .option("-n, --new <taskTitle>", "Create new task")
  .option("-r, --remove <taskId>", "Remove task")
  .option("-s, --subtask <taskId> <subtaskTitle...>", "Add subtask to task")
  .action((task_id: string, cmdObj: any) => {
    if (cmdObj.new) {
      console.log(chalk.gray(`Creating a new task with title: ${cmdObj.new}`));
      taskCommandWithNewOption(cmdObj.new);
      console.log(chalk.green(`New task created with title: ${cmdObj.new}`));
    } else if (cmdObj.remove) {
      console.log(chalk.gray(`Removing task with id: ${cmdObj.remove}`));
      taskCommandWithRemoveOption(cmdObj.remove);
      console.log(chalk.green(`Task removed with id: ${cmdObj.remove}`));
    } else if (cmdObj.subtask) {
      const [taskId, subtaskTitle] = cmdObj.subtask;
      console.log(chalk.green(`Adding subtask '${subtaskTitle}' to task '${taskId}'.`));
      taskCommandWithSubTaskOption(taskId,subtaskTitle);
      console.log(chalk.green(`Sub task added with title: ${cmdObj.subtask}`));
    } else {
      taskCommand(task_id);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// Display help if no arguments are provided
if (!process.argv.slice(2).length) {
  program.help();
}
