import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const serverOption = {
  host: "localhost",
  port: 3000,
};
server.on("listening", () => {
  console.log(
    `Server Start!! http://${serverOption.host}:${serverOption.port}`
  );
});
server.listen(serverOption);
/**
 * GET method
 * 1. GET은 서버로부터 정보를 조회하기 위해 설계되었다
 * 2. URL 주소에 쿼리 스트링(?변수 = 값&변수 = 값) 형식으로 전송한다.
 *    GET은 요청을 전송할 때 필요한 데이터를 Body에 담지 않고, 쿼리 스트링을 통해 전송 한다
 * 3. 단순한 값을 전송할 때 사용한다
 * 4. 모든 데이터가 노출되어 보안에 취약하다. 민감정보는 절대 담아서는 안된다
 * 5. 전체 길이는 255자를 넘지 못한다
 *
 * POST method
 * 1. POST는 리소스를 생성/변경하기 위해 설계되었다
 * 2. HTTP 프로토콜의 Body에 데이터를 실어서 전송한다
 * 3. 보통 form tag 로 둘러 쌓인 input tag에 입력된 값을 전송할 때 사용한다
 * 4. 전송하는 데이터가 표면상으로 노출되지 않는다
 * 5. 전송하는 데이터의 크기에 제한이 없다. 그림 파일등도 전송할 수 있다
 * 6. 전송하는 데이터를 암호화 하여 전송하기 용이하다
 */
