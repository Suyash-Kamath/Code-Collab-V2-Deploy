// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// import http from "http";
// import cors from "cors";
// import { SocketEvent, SocketId } from "./types/socket"; // Import the correct SocketEvent and SocketId
// import { USER_CONNECTION_STATUS, User } from "./types/user"; // Make sure the User type is defined properly
// import { Server } from "socket.io";
// import path from "path";

// dotenv.config();

// const app = express();

// // Middleware setup
// app.use(express.json());
// app.use(cors());
// app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Adjust according to your security requirements
//   },
//   maxHttpBufferSize: 1e8,
//   pingTimeout: 60000,
// });

// // Initialize userSocketMap as an empty array
// let userSocketMap: User[] = [];

// // Function to get users in a room
// function getUsersInRoom(roomId: string): User[] {
//   return userSocketMap.filter((user) => user.roomId === roomId);
// }

// // Function to get roomId by socketId
// function getRoomId(socketId: SocketId): string | null {
//   const user = userSocketMap.find((user) => user.socketId === socketId);
//   return user ? user.roomId : null;
// }

// // Function to get user by socketId
// function getUserBySocketId(socketId: SocketId): User | null {
//   return userSocketMap.find((user) => user.socketId === socketId) || null;
// }

// io.on("connection", (socket) => {
//   // Handle the JOIN_REQUEST event
//   socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }: { roomId: string, username: string }) => {
//     // Check if username exists in the room
//     const isUsernameExist = getUsersInRoom(roomId).some((u) => u.username === username);
//     if (isUsernameExist) {
//       io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS);
//       return;
//     }

//     const user: User = {
//       username,
//       roomId,
//       status: USER_CONNECTION_STATUS.ONLINE,
//       cursorPosition: 0,
//       typing: false,
//       socketId: socket.id,
//       currentFile: null,
//     };

//     userSocketMap.push(user);
//     socket.join(roomId);
//     socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });
//     const users = getUsersInRoom(roomId);
//     io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
//   });

//   // Handle user disconnecting
//   socket.on("disconnecting", () => {
//     const user = getUserBySocketId(socket.id);
//     if (!user) return;
//     const roomId = user.roomId;
//     socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user });
//     userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id);
//     socket.leave(roomId);
//   });

//   // File structure synchronization
//   socket.on(SocketEvent.SYNC_FILE_STRUCTURE, ({ fileStructure, openFiles, activeFile, socketId }) => {
//     io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, {
//       fileStructure,
//       openFiles,
//       activeFile,
//     });
//   });

//   // Directory actions (Create, Update, Rename, Delete)
//   socket.on(SocketEvent.DIRECTORY_CREATED, ({ parentDirId, newDirectory }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_CREATED, {
//       parentDirId,
//       newDirectory,
//     });
//   });

//   socket.on(SocketEvent.DIRECTORY_UPDATED, ({ directoryId, updatedDirectory }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_UPDATED, {
//       directoryId,
//       updatedDirectory,
//     });
//   });

//   socket.on(SocketEvent.DIRECTORY_RENAMED, ({ oldDirectoryId, newDirectoryName }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_RENAMED, {
//       oldDirectoryId,
//       newDirectoryName,
//     });
//   });

//   socket.on(SocketEvent.DIRECTORY_DELETED, ({ directoryId }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_DELETED, {
//       directoryId,
//     });
//   });

//   // File actions (Create, Update, Rename, Delete)
//   socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.FILE_CREATED, {
//       parentDirId,
//       newFile,
//     });
//   });

//   socket.on(SocketEvent.FILE_UPDATED, ({ fileId, updatedFile }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, {
//       fileId,
//       updatedFile,
//     });
//   });

//   socket.on(SocketEvent.FILE_RENAMED, ({ oldFileId, newFileName }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.FILE_RENAMED, {
//       oldFileId,
//       newFileName,
//     });
//   });

//   socket.on(SocketEvent.FILE_DELETED, ({ fileId }) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, {
//       fileId,
//     });
//   });

//   // User status updates (Online, Offline)
//   socket.on(SocketEvent.USER_ONLINE, (username: string) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { username });
//   });

//   socket.on(SocketEvent.USER_OFFLINE, (username: string) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { username });
//   });

//   // Messaging events
//   socket.on(SocketEvent.SEND_MESSAGE, ({ roomId, message }) => {
//     socket.broadcast.to(roomId).emit(SocketEvent.RECEIVE_MESSAGE, { message });
//   });

//   socket.on(SocketEvent.TYPING_START, ({ roomId, username }) => {
//     socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { username });
//   });

//   socket.on(SocketEvent.TYPING_PAUSE, ({ roomId, username }) => {
//     socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { username });
//   });

//   // Drawing events (if any)
//   socket.on(SocketEvent.REQUEST_DRAWING, (data) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.REQUEST_DRAWING, data);
//   });

//   socket.on(SocketEvent.SYNC_DRAWING, (drawingData) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.SYNC_DRAWING, drawingData);
//   });

//   socket.on(SocketEvent.DRAWING_UPDATE, (drawingUpdate) => {
//     const roomId = getRoomId(socket.id);
//     if (!roomId) return;
//     socket.broadcast.to(roomId).emit(SocketEvent.DRAWING_UPDATE, drawingUpdate);
//   });
// });

// // Serve index.html on root URL
// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, "..", "public", "index.html"));
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });


import express, { Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { SocketEvent, SocketId } from "./types/socket"; // Import the correct SocketEvent and SocketId
import { USER_CONNECTION_STATUS, User } from "./types/user"; // Make sure the User type is defined properly
import { Server } from "socket.io";
import path from "path";

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Adjust according to your security requirements
  },
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

// Initialize userSocketMap as an empty array
let userSocketMap: User[] = [];

// Function to get users in a room
function getUsersInRoom(roomId: string): User[] {
  return userSocketMap.filter((user) => user.roomId === roomId);
}

// Function to get roomId by socketId
function getRoomId(socketId: SocketId): string | null {
  const user = userSocketMap.find((user) => user.socketId === socketId);
  return user ? user.roomId : null;
}

// Function to get user by socketId
function getUserBySocketId(socketId: SocketId): User | null {
  return userSocketMap.find((user) => user.socketId === socketId) || null;
}

io.on("connection", (socket) => {
  // Handle the JOIN_REQUEST event
  socket.on(SocketEvent.JOIN_REQUEST, ({ roomId, username }: { roomId: string, username: string }) => {
    // Check if username exists in the room
    const isUsernameExist = getUsersInRoom(roomId).some((u) => u.username === username);
    if (isUsernameExist) {
      io.to(socket.id).emit(SocketEvent.USERNAME_EXISTS);
      return;
    }

    const user: User = {
      username,
      roomId,
      status: USER_CONNECTION_STATUS.ONLINE,
      cursorPosition: 0,
      typing: false,
      socketId: socket.id,
      currentFile: null,
    };

    userSocketMap.push(user);
    socket.join(roomId);
    socket.broadcast.to(roomId).emit(SocketEvent.USER_JOINED, { user });
    const users = getUsersInRoom(roomId);
    io.to(socket.id).emit(SocketEvent.JOIN_ACCEPTED, { user, users });
  });

  // Handle user disconnecting
  socket.on("disconnecting", () => {
    const user = getUserBySocketId(socket.id);
    if (!user) return;
    const roomId = user.roomId;
    socket.broadcast.to(roomId).emit(SocketEvent.USER_DISCONNECTED, { user });
    userSocketMap = userSocketMap.filter((u) => u.socketId !== socket.id);
    socket.leave(roomId);
  });

  // File structure synchronization
  // Add type for socket events
  socket.on(SocketEvent.SYNC_FILE_STRUCTURE, ({ fileStructure, openFiles, activeFile, socketId }: {
    fileStructure: any;
    openFiles: any;
    activeFile: any;
    socketId: string;
  }) => {
    io.to(socketId).emit(SocketEvent.SYNC_FILE_STRUCTURE, {
      fileStructure,
      openFiles,
      activeFile,
    });
  });

  // Directory actions (Create, Update, Rename, Delete)
  socket.on(SocketEvent.DIRECTORY_CREATED, ({ parentDirId, newDirectory }: {
    parentDirId: string;
    newDirectory: any;
  }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_CREATED, {
      parentDirId,
      newDirectory,
    });
  });

  socket.on(SocketEvent.DIRECTORY_UPDATED, ({ directoryId, updatedDirectory }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_UPDATED, {
      directoryId,
      updatedDirectory,
    });
  });

  socket.on(SocketEvent.DIRECTORY_RENAMED, ({ oldDirectoryId, newDirectoryName }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_RENAMED, {
      oldDirectoryId,
      newDirectoryName,
    });
  });

  socket.on(SocketEvent.DIRECTORY_DELETED, ({ directoryId }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.DIRECTORY_DELETED, {
      directoryId,
    });
  });

  // File actions (Create, Update, Rename, Delete)
  socket.on(SocketEvent.FILE_CREATED, ({ parentDirId, newFile }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_CREATED, {
      parentDirId,
      newFile,
    });
  });

  socket.on(SocketEvent.FILE_UPDATED, ({ fileId, updatedFile }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_UPDATED, {
      fileId,
      updatedFile,
    });
  });

  socket.on(SocketEvent.FILE_RENAMED, ({ oldFileId, newFileName }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_RENAMED, {
      oldFileId,
      newFileName,
    });
  });

  socket.on(SocketEvent.FILE_DELETED, ({ fileId }) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.FILE_DELETED, {
      fileId,
    });
  });

  // User status updates (Online, Offline)
  socket.on(SocketEvent.USER_ONLINE, (username: string) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.USER_ONLINE, { username });
  });

  socket.on(SocketEvent.USER_OFFLINE, (username: string) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.USER_OFFLINE, { username });
  });

  // Messaging events
  socket.on(SocketEvent.SEND_MESSAGE, ({ roomId, message }) => {
    socket.broadcast.to(roomId).emit(SocketEvent.RECEIVE_MESSAGE, { message });
  });

  socket.on(SocketEvent.TYPING_START, ({ roomId, username }) => {
    socket.broadcast.to(roomId).emit(SocketEvent.TYPING_START, { username });
  });

  socket.on(SocketEvent.TYPING_PAUSE, ({ roomId, username }) => {
    socket.broadcast.to(roomId).emit(SocketEvent.TYPING_PAUSE, { username });
  });

  // Drawing events (if any)
  socket.on(SocketEvent.REQUEST_DRAWING, (data) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.REQUEST_DRAWING, data);
  });

  socket.on(SocketEvent.SYNC_DRAWING, (drawingData) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.SYNC_DRAWING, drawingData);
  });

  socket.on(SocketEvent.DRAWING_UPDATE, (drawingUpdate: any) => {
    const roomId = getRoomId(socket.id);
    if (!roomId) return;
    socket.broadcast.to(roomId).emit(SocketEvent.DRAWING_UPDATE, drawingUpdate);
  });
});

// Serve index.html on root URL
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});