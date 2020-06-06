const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { queue } = require("./Queue");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  checkUser,
} = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const q = new queue();

let rooms = {};
let names = {};
let room;

app.use(router);

io.on("connect", (socket) => {
  console.log("connected");
  socket.on("checkUser", ({ name, room }, callback) => {
    const userExist = checkUser(socket.id, name, room);

    callback(userExist);
  });

  socket.on("randomChat", (callback) => {
    names[socket.id] = socket.id;
    console.log("users", q.count());
    if (q.count() > 0) {
      console.log("TEST");
      // somebody is in queue, pair them!
      let peer = q.getFirst();
      q.dequeue();
      room = socket.id + "#" + peer.id;
      // console.log("peer", peer);
      // console.log("peerSocket", socket);
      console.log("rooooom", room);
      // join them both
      peer.join(room);
      socket.join(room);
      // register rooms to their names
      rooms[peer.id] = room;
      rooms[socket.id] = room;

      // exchange names between the two of them and start the chat

      console.log("names, room", names[socket.id], names[peer.id]);
      // peer.emit("startChat", { name: names[socket.id], room: room });
      // socket.emit("startChat", { name: names[peer.id], room: room });

      socket.join(room);

      socket.emit("message", {
        user: "admin",
        content: {
          type: "text",
          content: `welcome to room.`,
          // content: `${user.name}, welcome to room ${user.room}.`,
        },
      });

      socket.broadcast.to(room).emit("message", {
        user: "admin",
        content: { type: "text", content: `Stranger has joined!` },
      });

      io.to(room).emit("roomData", {
        room: room,
        users: getUsersInRoom(room),
      });

      // const { error, user } = addUser(socket.id, name, room);

      // callback();
    } else {
      // queue is empty, add our lone socket
      q.enqueue(socket);

      // callback();
    }
  });

  socket.on("join", ({ name, room }, callback) => {
    if (name && room) {
      const { error, user } = addUser(socket.id, name, room);

      if (error) return callback(error);

      socket.join(user.room);

      socket.emit("message", {
        user: "admin",
        content: {
          type: "text",
          content: `${user.name}, welcome to room ${user.room}.`,
        },
      });

      socket.broadcast.to(user.room).emit("message", {
        user: "admin",
        content: { type: "text", content: `${user.name} has joined!` },
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    } else socket.emit("disconnectChat");
    // {
    //   if (random) {
    //     return;
    //   } else socket.emit("disconnectChat");
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(room).emit("message", { user: socket.id, content: message });
    // io.to(user.room).emit("message", { user: user.name, content: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        content: { type: "text", content: `${user.name} has left.` },
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
