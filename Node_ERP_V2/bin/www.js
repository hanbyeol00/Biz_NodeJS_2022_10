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
 *
 * HTTP에서 상태 유지 기법 세션(Session)
 * 1. 세션도 쿠키와 마찬가지로 클라이언트의 상태를 저장하고 상태를 유지하는 용도로 사용한다.
 * 2. 웹 브라우저는 각각 별도의 고유의 값을 갖는다
 * 3. 각 세션에 고유 ID 를 생성하고, 웹 서버는 각 브라우저에 세션 ID가 담긴 쿠기를 내려 보낸다
 *    Tomcat 에서 발급하는 쿠키의 Key 는 JSESSIONID 입니다
 * 4. 웹 브라우저는 웹 서버에 연결 할 때 세션 ID가 담긴 쿠키를 함께 전송한다
 * 5. 웹 서버는 요청 헤더에 담겨있는 세션 ID 를 확인하고
 *    세션 저장소에 보관중인 데이터를 조회하여 상태를 유지한다
 *
 * 쿠키와 세션의 중요한 차이 - 로그인 성공 후
 * 1. 쿠키는 로그인한 사용자의 정보를 Text 문자열로 생성하여 브라우저에 전송하고
 * 2. 브라우저는 쿠키 저장소에 사용자 정보를 문자열로 저장한다
 *
 * 1. 세션은 로그인한 사용자 정보를 서버의 메모리에 저장하고
 * 2. 저장소 ID 정보를 쿠키에 담아 브라우저에 전송한다
 * 3. 브라우저는 쿠키 저장소에는 세션의 ID 값만 저장이 되어 있다
 * 4. 서버로 전송된 쿠키에 담긴 세션 ID를 사용하여 서버 메모리에서 사용자 정보를 조회한다.
 *
 * 상태가 없는 HTTP 프로토콜
 * 1. HTTP 프로토콜은 클라이언트의 요청이 있을때 만 서버가 응답을 한다
 * 2. 무(無) 상태(stateless) : 요청/응답이 완료되면 클라이언트와 서버는 어떤 연결도 유지 하지 않는다
 *    클라이언트가 이전 요청과 같은 데이터를 원한다고 하더라도 다시 서버에 연결을 하여
 *    동일한 요청을 시도해야만 한다
 * 3. 비(非) 연결(connectionless)
 *    또한 요청/응답이 완료되면 클라이언트와 서버는 즉시 연결이 종료된다.
 *
 * 4. 무 상태, 비 연결 구조의 HTTP에서 사용자 인증을 처리하기 위해서는 매 요청마다
 *    사용자 정보를 어딘 가에 담아서 보내고, 서버는 매 요청마다 사용자 정보가 정상인지
 *    판단하는 절차를 통화해야 한다
 *    많은 사용자 요청이 있을 경우 서버는 많은 비용을 지불해야 할 수 있다
 *
 * 5. 초기 HTTP 프로토콜에서는 URL에 사용자정보를 함께 실어서 요청을 했었다
 *    http://username:password@www.example.com/
 *    지금은 사용하지 않으며 해당 요청은 브라우저에서 거부한다
 */
