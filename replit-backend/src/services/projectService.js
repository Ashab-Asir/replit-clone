import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import { REACT_PROJECT_COMMAND } from "../config/serverConfig.js";
import { execPromisify } from "../utils/exacUtility.js";
import directoryTree from "directory-tree";
import path from "path";
export const createProjectService = async () => {
  const projectid = uuid();
  await fs.mkdir(`./projects/${projectid}`);
  const response = await execPromisify(REACT_PROJECT_COMMAND, {
    cwd: `./projects/${projectid}`,
  });
  return projectid;
};

export const getProjectTreeService = async (projectId) => {
  const projectPath = path.resolve(`./projects/${projectId}`);
  const tree = directoryTree(projectPath);
  return tree;
};
