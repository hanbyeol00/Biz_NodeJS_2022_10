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
 * 협업을 위한 코딩 스타일
 * Pascal Case
 * 1. 첫 글자를 대문자로
 * 2. 단어를 조합할 때 두번째 단어부터 첫 글자 대문자
 * 3. Camel Case와 혼용하여 부르기도 한다. 이때 Upper Camel Case 라고 부르기도 한다
 * 4. C++에서 함수 명 작성할 때 사용
 * 5. java에서 클래스, 인터페이스, Enum을 작성할 때 사용
 * 6. 예: public class KorScore
 *
 * Camel Case
 * 1. 첫 글자를 소문자로
 * 2. 단어를 조합할 때 두번째 단어부터 첫 글자 대문자
 * 3. java에서 변수, method, 객체이름에 사용
 * 4. 예: int korScore, engScore
 *
 * 헝가리언 표기법
 * 1. 주로 변수 명을 지을 때 사용
 * 2. 변수 명 첫단어를 변수 type으로 시작
 * 3. 예: int iNum, int intNum String strName, Boolean bYesNo
 */
