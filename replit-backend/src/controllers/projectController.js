import {
  createProjectService,
  getProjectTreeService,
} from "../services/projectService.js";

export const createProjectController = async (req, res) => {
  const projectid = await createProjectService();
  return res.json({ message: "Project Created", data: projectid });
};

export const getProjectTreeController = async (req, res) => {
  const tree = await getProjectTreeService(req.params.projectId);
  return res.status(200).json({
    data: tree,
    success: true,
    message: "successfully fetch the tree",
  });
};
