import Projects from "../models/Projects.js";
import mongoose from "mongoose";
export const getProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  const project = req.body;

  const editProject = {
    ...project,
    description: JSON.stringify(project.description),
    access: JSON.stringify(project.access),
  };

  const newProject = new Projects({
    ...editProject,
  });

  try {
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(409).json({ message: error });
  }
};

export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { title, software, description, image, video, access } = req.body;
  console.log("here");
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedProject = {
    title,
    software,
    description: JSON.stringify(description),
    image,
    video,
    access: JSON.stringify(access),
    _id: id,
  };

  await Projects.findByIdAndUpdate(id, updatedProject, { new: true });

  res.json(updatedProject);
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Projects.findByIdAndRemove(id);

  res.json({ message: "Project deleted successfully." });
};
