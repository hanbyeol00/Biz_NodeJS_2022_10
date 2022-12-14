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

const debug = createDebug("node-foodv7:server");
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
 * API, Open API
 * 1. API(Application Programming Interface, 응용 프로그램 프로그래밍 인터페이스)는
 *    컴퓨터와 컴퓨터간, 컴퓨터와 컴퓨터 프로그램 사이의 연결이다.
 * 2. 일종의 소프트웨어 인터페이스이며 다른 종류의 소프트웨어에 서비스를 제공한다.
 * 3. 이러한 연결이나 인터네이스를 빌드하거나 사용하는 방법을 기술하는 문서나 표준을
 *    API사양으로 부른다.
 * 4. 표준을 충족하는 시스템은 API가 구현(implement) 되었다거나 노출(expose)되었다고 말한다.
 *    API라는 용어는 사양이나 구현체를 의미할 수 있다
 *
 * Open API
 * 1. Open Application Programming Interface,는 개발자라면 누구나 사용할 수 있도록 공개된 API를
 *    말하며, 개발자에게 사유 응용 소프트웨어나 웹 서비스의 프로그래밍 적인 권한을 제공한다.
 * 2. "하나의 웹 사이트에서 자신이 가진 기능을 이용할 수 있도록 공개한 프로그래밍 인터페이스가
 *    오픈 API다"라고 정의할 수 있다
 * 3. 네이버 지도, 구글맵, 오픈스트리트맵 등을 대표적인 예이다
 *    지도 서비스 및 다양한 서비스들에서 시도되고 있으며 누구나 접근하여 사용할 수 있다는 장점이 있다
 */
