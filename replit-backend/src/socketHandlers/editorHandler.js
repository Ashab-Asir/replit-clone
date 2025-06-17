import fs from "fs/promises";
export const handleEditorSocketEvents = (socket) => {
  socket.on("writeFile", async ({ data, pathToFileOrFolder }) => {
    try {
      const response = await fs.writeFile(pathToFileOrFolder, data);
      socket.emit("writeFileSucces", {
        data: "File Written Succesfully",
      });
    } catch (error) {
      console.log("Error writing the file", error);
      socket.emit("error", {
        data: "Error writing the file",
      });
    }
  });

  socket.on("createFile", async ({ pathToFileOrFolder }) => {
    const isFileAlreadyPresent = await fs.stat(pathToFileOrFolder);
    if (isFileAlreadyPresent) {
      socket.on("error", { data: "File alreday exists" });
      return;
    }
    try {
      const response = await fs.writeFile(pathToFileOrFolder, "");
      socket.emit("createFileSuccess", {
        data: "File created successfully",
      });
    } catch (error) {
      console.log("Error creating the file", error);
      socket.emit("error", { data: "Error writing the file" });
    }
  });
  socket.on("readFile", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.readFile(pathToFileOrFolder);
      console.log(response.toString());
      socket.emit("readFileSuccess", {
        value: response.toString(),
        path: pathToFileOrFolder,
      });
    } catch (error) {
      console.log("Error reading the file", error);
      socket.emit("error", {
        data: "Error reading the file",
      });
    }
  });

  socket.on("deleteFile", async ({ pathToFileOrFolder }) => {
    try {
      const stats = await fs.stat(pathToFileOrFolder);

      if (stats.isFile()) {
        await fs.unlink(pathToFileOrFolder);
      } else if (stats.isDirectory()) {
        await fs.rm(pathToFileOrFolder, { recursive: true, force: true }); // correct and powerful
      }

      socket.emit("deleteFileSuccess", {
        data: "Deleted successfully",
        path: pathToFileOrFolder,
      });
    } catch (error) {
      console.error("Error deleting the file/folder:", error);
      socket.emit("error", {
        data: `Error deleting: ${error.message}`,
      });
    }
  });

  socket.on("createFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.mkdir(pathToFileOrFolder);
      socket.emit("createFolderSuccess", {
        data: "Folder created successfully",
      });
    } catch (error) {
      console.log("Error creating the folder", error);
      socket.emit("error", {
        data: "Error creating the folder",
      });
    }
  });
  socket.on("deleteFolder", async ({ pathToFileOrFolder }) => {
    try {
      const response = await fs.rmdir(pathToFileOrFolder, { recursiv: true });
      socket.emit("deleteFolderSuccess", {
        data: "Folder deleted successfully",
      });
    } catch (error) {
      console.log("Error deleting the folder", error);
      socket.emit("error", {
        data: "Error deleting the folder",
      });
    }
  });
};
