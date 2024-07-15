import figlet from "figlet";
import { Command } from "commander";
import { all_option } from "./option/all.option";
import { task_option } from "./option/task.option";

// console.log(figlet.textSync("TODO CLI", "4Max"), "\n");

const program = new Command();

program
  .version("1.0.0")
  .description("simple todo cli")
  .option(
    "-a, --all",
    "see list of all tasks with details(subTasks, date, status, etc.)"
  )
  .option("-t, --task [task_id]", "see detail of task or tasks")
  .parse(process.argv);

const option = program.opts();


if (option.all) {
  console.log("🗃️  List of all tasks:", "\n");
  all_option();
} else if (option.task) {
  console.log("🗃️  List of all tasks:", "\n");
  task_option(option.task);
} else {
  program.help();
}
