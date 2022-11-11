import http from "http";
import app from "./app.js";

const server = http.createServer(app);
const serverOption = {
  host: "localhost",
  port: 3001,
};
server.on("listening", () => {
  console.log(
    `Server Start!! http://${serverOption.host}:${serverOption.port}`
  );
});
server.listen(serverOption);

/**
 * 프레임워크(FrameWork)
 * 1. 차, 비행기, 배 같은 탈것과 같은 잘 만들어진 "운송 수단"이라고 생각하면 된다.
 * 2. 여행을 하려면 운송 수단에 사람이 탑승하여 시동을 걸고, 기어를 넣고,
 *    핸들을 작동하고, 운전을 해야한다
 * 3. 하지만, 운송 수단은 서로 대체할 수 없다
 * 4. 하늘을 날려면 비행기를 타야하고, 도로를 달리려면, 자동차가 훨씬 유용하다
 *    바다에서는 배를 타야만 한다.
 * 5. 애초에 그 목적에 맞게 만들어졌기 때문에,
 *    톱이나 망치를 가지고 탈 것을 처음부터 직접 만들 필요를 없게 한다
 * 6. 정해진 규칙에 따라 시동을 걸고, 기어를 넣고, 핸들을 돌리기만 하면 된다
 * 7. 즉, 프레임워크는 이미 프로그래밍할 규칙이 정해져 있는 모듈을 활용하여
 *    규칙에 맞도록 개발자의 아이디어를 구현하는데 도움을 주는 도구이다
 */
