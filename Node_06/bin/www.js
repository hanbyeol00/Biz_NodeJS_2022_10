import http from "http";
import app from "./app.js";

const server = http.createServer(app);

server.listen(3000, "localhost");
/**
 * MVC(Model View Controllor) 패턴 기반 FullStack
 * 1. 사용자가 Web을 통해 Request(요청)를 하면
 * 2. DBMS를 통해 데이터를 SELECT 하고
 * 3. SELECT 된 데이터를 객체(Model)에 담아 View로 보내 renderion(html 변환) 한 후
 *      UI(시각적 표현,화면구현)로 Response
 * 4. Model View Controller 패턴은 요구사항이 변경되더라도 상호간에 최소한의 영향만으로
 *      프로젝트가 구현되어야 한다
 * 5. View 는 사용자와 상호작용하며 controller(router) 는 데이터 처리와 비지니스 로직(연산)을 담당한다
 */
