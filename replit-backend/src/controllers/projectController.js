import util from "util";
import child_porcess from "child_process";
import { v4 as uuid } from "uuid";
import fs from "fs/promises";
const execPromisify = util.promisify(child_porcess.exec);
export const createProjectController = async (req, res) => {
  const projectid = uuid();
  await fs.mkdir(`./projects/${projectid}`);
  const response = await execPromisify(
    "npm create vite@latest react-project -- --template react",
    {
      cwd: `./projects/${projectid}`,
    }
  );
  return res.json({ message: "Project Created", data: projectid });
};
