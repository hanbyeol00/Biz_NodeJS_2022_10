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

const debug = createDebug("node-schoolv2:server");
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
 * 오류(Error)
 * 1. 코딩 문법 오류로 인한 "컴파일"시 오류와 "런타임"시 널포인트 참조와 같은 오류가 있으며
 *    심각한 문제를 야기 시켜 프로세스(애플리케이션)가 종료 되거나 중단 된다
 * 2. 시스템 에러(Error)는 컴퓨터 하드웨어의 오동작 또는 고장으로 인해
 *    응용프로그램에 이상이 생겼거나 JVM 실행에 문제가 생겼을 경우 발생한다
 * 3. 코딩 문법 오류는 IDE가 알려주거나 컴파일 단계에서 발견된다
 * 4. 런타임시 오류는 사전에 개발자가 미리 예측하기 어려운 경우가 많기 때문에
 *    문법 상 강제 상황을 제외하고 애플리케이션의 런타임 오류에 대한 처리(해결)를 하지 않는 경우가 많다
 * 5. 오류가 발생하는 상황을 항상 미리 예측하여 적절한 Exception 핸들링 하는 것이 좋다
 *
 * 예외(Exception) 처리
 * 1. 예외 상황도 오류와 같이 응용프로그램, 프로세스를 종료 시키는 것은 유사하다
 * 2. 개발자가 예측할 수 있는 상황이 많으며, 적절한 처리(Exception Handling) 를 수행하여
 *    최소한 응용프로그램, 프로세스가 종료 되거나 중단되지 않도록 해야한다
 * 3. Exception 처리가 잘 되어 프로세스 종료를 최대한 방지하는 것이 좋은 애플리케이션이다
 */
