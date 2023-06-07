import { io } from "socket.io-client";

const socket = io("http://localhost:9000");
socket.emit("data", 1, 1, (val) => {
  console.log("returned", val, test("a"));
});

function test(a, b, c) {
  return a;
}
