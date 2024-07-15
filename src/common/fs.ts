import fs, { writeFileSync } from "fs";
import path, { dirname } from "path";

const BASE_PATH = path.join(__dirname, "..", "..", "data");
const DATA_FILENAME = "tasks.json";

export function readData<t>(fileName: string = DATA_FILENAME): t {
  createDirectory(BASE_PATH);
  return JSON.parse(fs.readFileSync(`${BASE_PATH}/${fileName}`, "utf8"));
}

export function writeData<t>(data: t, relativePath: string = DATA_FILENAME): void {
  createDirectory(BASE_PATH);
  const dirPath = dirname(relativePath);
  createDirectory(dirPath);
  writeFileSync(`${BASE_PATH}/${relativePath}`, JSON.stringify(data, null, 2));
}

export function fileExists(path: string): boolean {
  return fs.existsSync(path);
}

export function createDirectory(path: string): void {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}
