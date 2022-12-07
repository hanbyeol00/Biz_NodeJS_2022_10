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

const debug = createDebug("node-bbs-my-v1:server");
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
 * Transaction 2
 * 병행처리(여러 트랜잭션의 동시 수행) 문제
 * 1. 갱신 내용 손실 : 하나의 데이터가 동시에 갱신될 때 갱신이 누락되는 문제
 * 2. 현황 파악 오류 : 데이터 갱신이 완료되지 않았는데 다른 트랜잭션이
 *    데이터를 조회하는 문제
 * 3. 모순성 : 데이터의 일관성이 깨져 모순된 상태로 남는 문제
 * 4. 연쇄 복귀 : 두 트랜잭션 중 한 곳에서 롤백이 되면, 다른 트랜잭션도 롤백되는 문제
 * 병행처리 문제 방지
 * 1. 로깅 제어 기법을 사용한다
 * 2. 트랜잭션이 시작할 때 필요한 데이터를 모두 Lock을 걸고 시작하는 것
 * 3. 공유로깅 : 읽기만 허용하는 Lock
 * 4. 배타로깅 : 읽기, 쓰기 모두 금지하는 Lock
 */
