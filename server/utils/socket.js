import { Socket } from "socket.io";
/**
 *
 * @param {Socket} socket
 * @param {String} event
 * @param {Map} message
 * @returns
 */

export async function sendToSocket(socket, event, message) {
  socket.emit(event, message);
}
/**
 *
 * @param {Socket} socket
 * @param {String} room
 * @param {String} event
 * @param {Map} message
 * @returns
 */

export async function sendToSocketRoom(socket, room, event, message) {
  socket.to(room).emit(event, message);
}
