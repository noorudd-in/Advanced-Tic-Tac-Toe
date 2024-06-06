const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let gameData = {};

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    for (ele in gameData) {
      if (gameData[ele].p1?.id == socket.id) {
        gameData[ele].p1 = null;
        socket.broadcast.emit(`user_left${ele}`);
        break;
      } else if (gameData[ele].p2?.id == socket.id) {
        gameData[ele].p2 = null;
        socket.broadcast.emit(`user_left${ele}`);
        break;
      }
    }
  });

  socket.on("join_room", ({ roomName, data }) => {
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomName);
    if (room == undefined) {
      socket.join(roomName);
      gameData[roomName] = {
        p1: { id: socket.id, grid: data.grid, name: data.name },
        p2: null,
      };
      socket.emit(`created${roomName}`, gameData);
    } else if (room.size == 1) {
      socket.join(roomName);
      let newData = { ...gameData[roomName] };
      if (newData.p1 == null) {
        newData.p1 = { id: socket.id, grid: data.grid, name: data.name };
      } else {
        newData.p2 = { id: socket.id, grid: data.grid, name: data.name };
      }
      gameData[roomName] = newData;
      socket.emit(`joined${roomName}`, gameData);
      socket.broadcast.emit(`allJoined${roomName}`, gameData);
    } else {
      socket.emit("full", "Sorry room is full!");
    }
  });

  socket.on("send_move", (data) => {
    socket.broadcast.emit(`get_move${data.room}`, data);
  });
  socket.on("restart_game", (data) => {
    socket.broadcast.emit(`restart_game${data.room}`, data.message);
  });
});

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
