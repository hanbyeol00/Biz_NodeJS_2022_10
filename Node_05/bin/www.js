import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const ServerConfig = {
  host: "localhost",
  port: 3000,
};

server.on("listening", () => {
  console.log("Server Start Listening");
  console.log(
    `Web Browser Connect http://${ServerConfig.host}.${ServerConfig.port}`
  );
});

server.listen(ServerConfig);
/**
 * SQL (Structured Query Lang.)
 * 1. RDBMS 에 접근하기 위한 데이터베이스 코딩 언어
 * 2. DDL, DML, DCL, TCL 등이 있다
 *
 * DDL (Data definition lang.) 데이터 정의어
 * 1. 데이터저장소, table, 사용자, 인덱스 등 데이터베이스 객체(Object) 생성, 제거, 변경
 * 2. CREATE : 생성, DROP : 제거, ALTER : 변경
 *
 * DML(Data Manipulation lang.) 데이터 조작어
 * 1. 생성된 데이터 table 을 기준으로 CRUD 실행
 * 2. INSERT(Create, 추가), SELECT(Read, 조회) UPDATE(Update, 변경), DELETE(delete, 삭제)
 *
 * DCL (Data Control Lang.) 데이터 제어어
 * 1. 데이터베이스의 접근권한 등을 설정
 * 2. GRANT : 권한부여, REVOKE : 권한 회수
 */
