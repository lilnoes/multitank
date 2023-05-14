import { sleep } from "../../public/client/time.js";

export async function sendToSocket(socket, message) {
  return new Promise(async (res, rej) => {
    socket.write(JSON.stringify(message) + "\r\n");
    res();
  });
}
