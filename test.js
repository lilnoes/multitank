import net from "net";

let { host, port } = extractHostAndPort("tcp://2.tcp.eu.ngrok.io:17960");
const client = net.createConnection(
  {
    port: port,
    // path: "tcp://0.tcp.eu.ngrok.io",
    host: host,
    // host: "localhost",
    keepAlive: true,
    keepAliveInitialDelay: 60000,
    noDelay: true,
  },
  () => {}
);
client.write("Hello yewe");
client.on("data", (data) => {
  console.log("data came", data.toString());
});
client.on("connect", () => {
  console.log("connected");
});

function extractHostAndPort(url) {
  const match = url.match(/:\/\/(.*?):(\d+)/i);
  if (match) {
      return { host: match[1], port: match[2] };
  } else {
      throw new Error('URL does not have valid format');
  }
}
