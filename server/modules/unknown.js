export const UNKNOWNMESSAGE = {
  type: "UNKNOWNMESSAGE",
  verify: function (json) {
    if (json.type == this.type)
      return true;
    return false;
  },
};
