import express from "express";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
