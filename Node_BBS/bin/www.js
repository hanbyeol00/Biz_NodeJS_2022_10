/**
 * http Server Setting
 */
import http from "http";
import app from "./app.js";
import createDebug from "debug";

// port number check
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) {
    return val;
  }

  // well Known Port greate then
  if (port >= 1024) {
    return port;
  }
  return false;
};

const debug = createDebug("node-bbs:server");
const port = normalizePort(process.env.PORT || "3000");

/**
 * Create HTTP server.
 * http and app(express framework) integration
 */
const server = http.createServer(app);

server.listen(port);

// Event listener for HTTP server "error" event.
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});

// Event listener for HTTP server "listening" event.
server.on("listening", () => {
  const addr = server.address();
  console.log(addr);
  const bind =
    typeof addr === "string"
      ? `address : ${addr.address}, port : ${addr.port}`
      : `address : ${addr.address}, port : ${addr.port}`;
  debug("Http Listening on " + bind);
  console.log(`Http Listening on http://localhost:${addr.port}`);
});
/**
 * WAS(Web Application Service, Server)
 * WEB
 * 1. 인터넷 기반의 정보기술로 World Wide Web의 줄임 말이며 www 라고도 한다
 * 2. 전세계 거대한 TCP/IP 네트워크 망(Mash)을 통해 정보를 공유한다
 *
 * Web Application
 * 1. 웹브라우저를 통해서 실행되는 응용프로그램
 * 2. 인터넷을 통한 은행업부, 인터넷쇼핑, 민원신청 등이 여기에 속한다
 * 3. PC 환경에서 실행되던 응용프로그램이 Web 환경으로 이전되고 있다
 * 4. 사용자가 요청(request)을 하면 서버에서는 요청을 분석하여
 *    적절한 비즈니스 로직을 수행하고 사용자에게 결과를 응답(response)한다
 * 5. 웹 브라우저, 웹 서버, 웹 어플리케이션 서버, 데이터베이스 서버등이
 *    통합된 환경으로 운영된다
 */
