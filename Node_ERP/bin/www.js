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
// ERD = 데이터베이스들의 관계도(Entity Relationship Diagram)
/**
 * PRIMARY KEY
 * 1. 기본키(PK)를 설정하여 데이터 조작에 유일한 절대성을 부여하는 것
 *    필요에 따라 수정, 삭제한 데이터는 다른 레코드에 영향을 미치지 않는다.
 * 2. 기본키의 값은 유일(UNIQUE)해야 하며 NOT NULL 성질을 갖는다
 * 3. 자동으로 Unique Index 가 설정된다.
 * 4. 한 개의 table 에 1개만 존재한다
 * 5. 다른 Table 과 FK 설정을 할 수 있다.
 *
 * NOT NULL, UNIQUE
 * 1. 데이터 입력의 유효성을 검증하는 목적으로 주로 사용된다
 * 2. NOT NULL과 UNIQUE 를 동시 설정하면 PK와 비슷한 성질을 갖지만 차이점이 있다
 * 3. 한 Table 의 여러 칼럼에 설정 할 수 있다
 * 4. UNIQUE 가 설정된 칼럼은 다른 Table 과 FK 설정을 할 수 있다
 */
