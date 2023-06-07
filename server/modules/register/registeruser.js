import { IDMESSAGE } from "./id.js";

export const REGISTERUSERMESSAGE = {
  message: { type: "REGISTERUSER", name: "", password: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket, callback) {
    const { saveUser } = await import("../../utils/db.js");

    const user = await saveUser(json.name, json.email, json.password);

    let message = {};
    if (user == null)
      message = { ...ERRORMESSAGE.message, error: "error registering" };
    else message = { ...IDMESSAGE.message, ...user };

    callback(message);
  },
};
