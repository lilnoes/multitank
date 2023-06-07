import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {
  console.log("connected");
  socket.on("data", (a, b, callback) => callback(a + b));
});

io.listen(9000);
