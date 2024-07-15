import { TaskStatus } from "../enum/status.enum";

export function statusToEmoji(s: TaskStatus): string {
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