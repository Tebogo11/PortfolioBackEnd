import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import projectRoutes from "./routes/project.js";
const app = express();
dotenv.config();
//Parse data from a json format e.g {"Name": "John Smith", "Age": 23}
app.use(express.json({ limit: "30mb", extended: true }));
//Parse data from a url format e.g Name=John+Smith&Age=23
app.use(express.urlencoded({ limit: "30mb", extended: true }));
// Cross - Origin Resource Sharing(CORS) is an HTTP - header based mechanism
// that allows a server to indicate any origins(domain, scheme, or port)
// other than its own from which a browser should permit loading of resources.
//more info https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use(cors());

app.use("/projects", projectRoutes);

//the url to Connect to mongodb cloud atlas db
// const CONNECTION_URL =
//   "mongodb+srv://demouser123:demopass123@memories.zwzi5.mongodb.net/Memories?retryWrites=true&w=majority";

app.get("/", (req, res) => {
  res.send("Hello Tebogo Dube, or others");
});

//the port in which our application will run on
//you need dotenv to active eniviroment variables
const PORT = process.env.PORT || 5000;

//Connecting to our db with mongoose
//Mongoose is a MongoDB object modeling tool designed to work
//in an asynchronous environment.
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log("Application running"));
