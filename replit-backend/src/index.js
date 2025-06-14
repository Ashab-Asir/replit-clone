import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT } from "./config/serverConfig.js";
import apiRouter from "./routes/index.js";
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

io.on("connect", (socket) => {
  console.log("a user connected");
});
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
