import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { PORT } from "./config/serverConfig.js";
import chokidar from "chokidar";
import apiRouter from "./routes/index.js";
import { handleEditorSocketEvents } from "./socketHandlers/editorHandler.js";
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

const editorNamespace = io.of("/editor");
editorNamespace.on("connection", (socket) => {
  console.log("editor connected");

  let projectId = socket.handshake.query["projectId"];
  console.log("Porject id recevied after connection", projectId);
  if (projectId) {
    var watcher = chokidar.watch(`./project/${projectId}`, {
      ignored: (path) => path.includes("node_modules"),
      persistent: true,
      awaitWriteFinish: 2000,
      ignoreInitial: true,
    });
    watcher.on("all", (event, path) => {
      console.log(event, path);
    });
  }
  handleEditorSocketEvents(socket);
  socket.on("disconnect", async () => {
    await watcher.close();
    console.log("editor disconnected");
  });
});
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
