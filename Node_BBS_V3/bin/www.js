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
 * 협업을 위한 코딩 스타일
 * Snake Case
 * 1. 모든 글자를 소문자 또는 대문자, 한글
 * 2. 두개 이상의 단어를 조합할 때 단어와 단어사이를 언더 바(언더 스코어 _ )로 연결
 * 3. 예: kor_score, eng_score, 국어_점수, NAVER_CLIENT_ID
 *
 * Kebab Case
 * 1. 모든 글자를 소문자 또는 대문자, 한글
 * 2. 두개 이상의 단어를 조합할때 단어와 단어 사이를 대시(마이너스 - )로 연결
 * 3. HTML의 class 속성이름, id 속성이름 등에서 사용
 * 4. 변수명과 혼동되어 코딩 문법 오류를 일으키는 경우도 있음
 * 5. 예: nav-link, nav-item, BODY-NAME
 */
