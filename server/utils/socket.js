import { sleep } from "../../public/client/time.js";

export async function sendToSocket(socket, message) {
  return new Promise(async (res, rej) => {
    await sleep(40);
    socket.write(message);
    res();
  });
}
