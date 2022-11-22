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

const debug = createDebug("node-erp:server");
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
 * 커뮤니티
 * 1. 코딩 = 개발? NO : 협업
 * 2. 누군가 나와 대화를 할 때 숨이 막혀 한다면?
 * 3. 사소한 대화를 하는 동안 아이디어가 떠오르고, 문제해결이 된다면?
 *
 * 생산성
 * 1. 개발은 시간 싸움이다. : 야근은 필수가 아니라 선택이다
 * 2. 환상적인 코드보다 빨리 완성된 코드가 좋은 코드이다. 단, 버그가 없어야 한다
 *
 * 지속적인 학습
 * 1. 학습은 좋은 개발자가 계속 좋은 개발자로 남는 길이다
 * 2. 학습은 보통 개발자가 좋은 개발자가 될 수 있는 좋은 요소이다
 *
 * 코드 리딩과 라이팅
 * 1. 코드리당: 만들어진 소스코드를 리딩하고 명명규칙 파악하기 : 협업에서 가장 중요
 * 2. 잘 정돈되고 직관적이며 네이밍이 잘된 코드 작성하기 : 내 코드는 혼자 보는게 아니다
 * 3. 내가 만든 코드는 누가 봐도 쉽게 이해할 수 있어야 한다
 *
 * Http status Code, Response Code
 * - 200 : 데이터를 준비하고 있으니 기다려
 * - 302 : Redirect 할께
 *   304 : Redirect 할께, 변경된 내용이 없어
 * - 400 : 매개변수 오류
 *   401 : 권한오류
 *   402 : 권한오류
 *   404 : 요청을 처리할 method 가 없어, 응답할 URI(URL)이 없음
 *   405 : URI는 있으나
 *         RequestMethod(GET, POST, PUT, DELETE) 가 없음
 * - 500 : 서버 내부 오류
 */
