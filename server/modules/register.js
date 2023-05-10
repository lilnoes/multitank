export const REGISTERUSERMESSAGE = {
  type: "REGISTERUSER",
  name: "",
  password: "",
  verify: function (json) {
    if (json.type == this.type && json.name != null && json.password != null)
      return true;
    return false;
  },
};
