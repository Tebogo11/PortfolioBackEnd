import mongoose from "mongoose";

//mongoose schema defines the structure and rule of the data
const projectSchema = mongoose.Schema({
  image: String,
  video: String,
  title: String,
  software: [String],
  //Stringified {About:"", Why: "", How: ""}
  description: String,
  //Stringified Array of objects [{title: "", Link:""},...]
  access: String,
});

//Turn schema to model
const Projects = mongoose.model("Projects", projectSchema);

export default Projects;
