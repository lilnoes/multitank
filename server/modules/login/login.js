import { ERRORMESSAGE } from "../register/error.js";
import { IDMESSAGE } from "../register/id.js";

export const LOGINMESSAGE = {
  message: { type: "LOGIN", email: "", password: "" },
  /**
   *
   * @param {String} json
   * @param {import("socket.io").Socket} socket
   * @returns
   */
  handle: async function (json, socket, callback) {
    const { loginUser } = await import("../../utils/db.js");

    const user = await loginUser(json.email, json.password);
    let message = {};
    if (user == null)
      message = { ...ERRORMESSAGE.message, error: "error logging in" };
    else message = { ...IDMESSAGE.message, ...user };

    callback(message);
  },
};
