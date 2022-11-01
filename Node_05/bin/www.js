import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const ServerConfig = {
  host: "localhost",
  port: 3000,
};

server.on("listening", () => {
  console.log("Server Start Listening");
  console.log(
    `Web Browser Connect http://${ServerConfig.host}.${ServerConfig.port}`
  );
});

server.listen(ServerConfig);
