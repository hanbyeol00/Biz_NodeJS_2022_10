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
 * Javascript fetch 함수 비동기 방식으로 실행
 *
 * fetch("http://exapmple.com/user/info")
 * .then(response => response.json())
 * .then(result => console.log(result))
 *
 * 1. WebAPI 인 fetch 함수를 사용하여 example.com 서버에 user 정보(info)를 요청한다
 * 2. Event loop 에 의해 fetch 함수와 1번 response => response.json() 함수와
 *    2번 result => console.log(result) 함수의 코드가 call stack 에 push 된다
 * 3. fetch 함수는 오류가 없으면 즉시 종료되고 call stack 에서 제거된다
 * 4. 서버에서 응답이 오면 1번 함수가 실행되고 response 결과에서 json 데이터를 추출한후 return
 *    1번 함수 코드도 call stack 에서 제거된다
 * 5. return 된 결과를 2번 함수 코드에서 console 에 출력한 후 2번 함수도 call stack 에서 제거된다
 *
 * javascript fetch 함수 동기 방식으로 실행
 *
 * const response = await fetch("http://exapmple.com/user/info")
 * const result = await response.json()
 * console.log(result)
 *
 * 1. ES5 이상에서는 promise 를 사용하여 동기적으로 실행이 가능하다
 * 2. 비동기 Call back 을 사용하지 않고 async, await 조합으로 동기 실행이 가능하다
 */
