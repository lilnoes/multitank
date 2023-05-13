export async function sendToSocket(socket, message) {
  return new Promise((res, rej) => {
    socket.write(message);
    setTimeout(res, 10);
    // res();
  });
}
