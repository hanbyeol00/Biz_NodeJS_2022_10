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
 *
 * 정규화
 * 목적
 * 1. 데이터의 중복을 최소화
 * 2. Insert(삽입), Delete(삭제), Update(갱신)이상 현상을 방지
 * 3. 데이터베이스 구조 변경 확장 시 재 디자인 최소화
 * 4. 데이터 모델을 사용자에게 더울 의미 있게
 * 5. 다양한 질의 지원
 *
 * 정규화 요약
 * 1. 제1정규화 : 각 칼럼들의 값이 원자 값을 갖도록 한다
 * 2. 제2정규화 : 부분 함수 종속성을 제거
 * 3. 제3정규화 : 기본키를 제외한 속성들 간에 이행적 함수 종속 제거
 * 4. BCNF 정규화 : 결정자이며 후보키가 아닌 것을 제거
 * 5. 제4 정규화 : 다치 종속 제거
 *
 * 함수 종속성
 * 1. 테이블의 속성(칼럼)간의 관계에서 속성A에 의해 속성B가 결정될 때 B는 A에 함수적으로 종속
 *
 *  * 주니어 개발자의 자세
 * 코드 리딩과 라이팅
 * 1. 코드리딩 : 만들어진 소스코드를 리딩하고 명명규칙 파악하기 협업에서 가장 중요
 * 2. 잘 정돈되고 직관적이며 네이밍이 잘된 코드 작성하기 내 코드는 혼자 보는게 아니다
 * 3. 내가 만든 코드는 누가 봐도 쉽게 이해할 수 있어야 한다
 *
 * 생산성
 * 1. 개발은 시간 싸움이다. : 야근은 필수가 아니라 선택이다.
 * 2. 환상적인 코드보다 빨리 완성된 코드가 좋은 코드이다. 단, 버그가 없어야 한다
 *
 * 커뮤니티
 * 1. 코딩 = 개발 ? NO : 협업
 * 2. 누군가 나와 대화를 할 때 숨이 막혀 한다면?
 * 3. 사소한 대화를 하는 동안 아이디어가 떠오르고, 문제해결이 된다면?
 *
 * 업무관리
 * 1. 개발자는 개발만 하는 사람이 아니다.
 * 2. 세상의 모든 직업은 부수적인 업무관리가 필수적이다.
 * 3. 본업무가 아니더라도 가장 빨리 마무리 할 수 있는 방법을 항상 연구하라
 *
 * 지속적인 학습
 * 1. 학습은 좋은 개발자가 계속 좋은 개발자로 남는 길이다
 * 2. 학습은 보통 개발자가 좋은 개발자가 될 수 있는 중요한 요소이다
 */
