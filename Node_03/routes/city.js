/**
 * express import 하고
 * express.Router() 함수를 사용하여 router 객체 선언
 * router 객체를 export 하여 모듈 선언 완성
 *
 * http://localhoty:3000/city 로 요청할 경우
 * "안녕하세요 도시 정보 입니다~~" 라고 화면에 나타나도록
 * app.js 에 설정
 */
import e from "express";
import express from "express";
import mysql from "../modules/mysqlDB.js";

const router = express.Router();

// http://localhost:3000/city/ 의 요청처리
router.get("/", (req, res) => {
  // res.send("안녕하세요 도시 정보 입니다~~");
  const citySelect = "SELECT * FROM city Limit 0, 10";

  /**
   * mysql 객체(퀵배달)를 통하여 MySQL Server 에게
   * SQL(SELECT)를 보내고, 결과가 되돌아 오는 동안
   * 다른 일(코드, 기능)을 수행하라
   * 만약 MySQL Server 에서 데이터가 완료되어 되돌아 오거든
   * (error, result, fields)=>{} 이 함수를 실행하라
   * 이 함수를 비동기(Async) CallBack 함수 라고한다
   */
  mysql.query(citySelect, (error, result, fields) => {
    res.json(result);
  });
});

/**
 * localhost:3000/city/pop/10000/50000 이라고 요청을 하면
 * 인구 1만 이상 5만 이하의 도시를 웹으로 REsponse 하시오
 * requestParam 방식으로 데이터 전달하기
 * 마치 주소가 이미 만들어 진것처럼 보내서
 * 변수를 노출하지 않는다
 * 최근에 많이 사용되는 방법
 *
 * lt : <
 * gt : >
 */
router.get("/pop/:lt_pop/:gt_pop", (req, res) => {
  const lt_pop = req.params.lt_pop;
  const gt_pop = req.params.gt_pop;
  const citySelectWhere = "SELECT * FROM city WHERE Population BETWEEN ? AND ?";
  mysql.execute(citySelectWhere, [lt_pop, gt_pop], (err, result, f) => {
    res.json(result);
  });
});

// http://localhost:3000/city/pop?gt_pop=50000&lt_pop=10000
// http://localhost:3000/city/pop?lt_pop=10000&gt_pop=50000
// queryString : 주소표시줄에
//      ?변수명=값 형식으로 데이터 전달하기
//      주소표시줄에 변수명이 그대로 노출되므로 보안에 취약하다
router.get("/pop", (req, res) => {
  const lt_pop = req.query.lt_pop;
  const gt_pop = req.query.gt_pop;
  const citySelectWhere = "SELECT * FROM city WHERE Population BETWEEN ? AND ?";
  mysql.execute(citySelectWhere, [lt_pop, gt_pop], (err, result, f) => {
    res.json(result);
  });
  console.log(req.query);
});

/**
 * http://localhost:3000/country/100/500
 * 각 국가의 GNP 가 100 이상 500 이하인 국가 리스트 SELECT
 * http://localhost:3000/country/100
 * 각 국가의 GNP 가 0이상 100 이하인 국가 리스트 SELECT
 *
 * 이 두개의 요청을 한개의 router.get() 에서 처리
 */

// router.get("/country", (req, res) => {
//   const lt_GNP = req.query.lt_GNP;
//   const gt_GNP = req.query.gt_GNP;
//   if (!gt_GNP) {
//     // http://localhost:3000/city/country?lt_GNP=100
//     const citySelectWhere =
//       "SELECT * FROM country WHERE GNP <= ? ORDER BY GNP asc";
//     mysql.execute(citySelectWhere, [lt_GNP], (err, result, f) => {
//       res.json(result);
//     });
//   } else {
//     // http://localhost:3000/city/country?lt_GNP=100&gt_GNP=500
//     const citySelectWhere =
//       "SELECT * FROM country WHERE GNP BETWEEN ? AND ? ORDER BY GNP asc";
//     mysql.execute(citySelectWhere, [lt_GNP, gt_GNP], (err, result, f) => {
//       res.json(result);
//     });
//   }
// });

// http://localhost:3000/city/country/ 의 요청처리
router.get("/country", (req, res) => {
  // res.send("나는 국가 정보입니다");
  const countrySelect = "SELECT * FROM country Limit 0, 10";
  mysql.query(countrySelect, (err, data, fields) => {
    res.json(data);
  });
});
// http://localhost:3000/country/100 처럼 요청하면
//      없는 URI 라고 거부 (Not Found Error)
// 두가지 Req 를 처리하기 위하여
// RequestMapping을 배열로 선언하여
// 두가지 Req 를 일단 모두 받도록 처리한다.
// Multi RequestMapping 이라고 한다.
router.get(["/country/:start/:end", "/country/:end"], (req, res) => {
  // 변수가 2개일때, 또는 변수가 1개일때 어떻게 처리할 것인가
  // let start = req.params.start;
  // const end = req.params.end;

  /**
   * 객체의 구조분해
   * req.params 에 있는 sub 속성들 중에서
   * start, end 를 추출하여 같은 이름의 변수를 생성하고
   * 그 변수에 값을 저장해 달라
   */
  let { start, end } = req.params;
  /**
   * 현재 여기의 요청 처리는 start 변수와 end 변수를 전달받아
   * 처리한다
   * country/100/300 처럼 2개의 변수를 모두 전달하면
   * start = 100, end = 300 의 값이 변수에 담기게 된다
   *
   * 만약
   * country/100 처럼 1개의 변수를 전달하면
   * start = undefined, end = 100 의 값이 변수에 담기게 된다
   * 만약 start 가 undefined 이면 start = 0 으로 세팅하면 된다
   */

  // if (!start) {
  //   start = 0;
  // }
  // start 의 값이 (0, NaN, null, undefined, "")이면 || 이후의 값을 저장하라
  start = start || 0;

  console.log(start, end);
  const sql = "SELECT * FROM country WHERE gnp BETWEEN ? AND ?";
  mysql.execute(sql, [start, end], (err, data, fields) => {
    res.json(data);
  });
});

// 선택적 파라메터 RequestMapping
router.get("/gnp/:start?/:end?", (req, res) => {
  let { start, end } = req.params;
  console.log(start, end);
  // city/gnp/100 처럼 1개의 데이터만 전송을 하면
  // start = 100, end = undefined 가 담기게 된다
  // 일단 end 값이 undefined 이면 0으로 세팅을 해준다
  end = end || 0;
  // city/gnp/100 처럼 1개의 데이터만 전송을 했다면
  // start = 100, end = 0으로 세팅이 될것이다
  console.log(start, end);
  // start 와 end 가 서로 바뀐 상태
  // start 와 end 를 서로 교환하기
  if (end === 0) {
    // const _t = start;
    // start = end;
    // end = _t;

    // (X^Y)^Y = X
    // XOR(배타적 논리연산, 같은값은 0, 다른값은 1인 논리연산)
    // 을 이용한 두 변수의 값 교환하기(변수의 Swap)
    start = start ^ end;
    end = start ^ end;
    start = start ^ end;
  }
  const sql = "SELECT * FROM country WHERE gnp BETWEEN ? AND ?";
  mysql.execute(sql, [start, end], (err, data, fields) => {
    res.json(data);
  });
});

export default router;

// localhost:3000/city/도시이름 이라고 요청을 하면
router.get("/:name", (req, res) => {
  const ct_name = req.params.name;
  const citySelectWhere = "SELECT * FROM city WHERE name = ?";
  mysql.execute(citySelectWhere, [ct_name], (err, result, f) => {
    res.json(result);
  });
});

/**
 * URI (Uniform Resource Identifier, 통합 자원 식별자)
 * 1. 인터넷에 있는 자원을 나타내는 유일한 주소
 * 2. URI의 존재는 인터넷에서 요구되는 기본조건으로서 인터넷 프로토콜에 항상 연결
 * 3. 하위개념인 URL, URN 을 포괄 포함
 * URL (Uniform Resource locator)
 * 1. 많은 네트워크 상에서 자원이 어디 있는지를 알려주기 위한 규약
 * 2. 즉, 컴퓨터 네트워크와 검색 메커니즘에서의 위치를 지정하는, 웹 리소스 대한 참조
 * URN (Uniform Resource name)
 * 1. urn:scheme 을 사용하는 URI를 위한 역사적인 이름이다. URN은 영속적이고 위치에
 *  독립적인 자원을 위한 지시자로 사용하기 위해 1997년도 RFC 2 13 1 문서에서
 *  정의되었다
 *
 * vi 명령상태
 * :w 저장
 * :q 나가기
 * :wq 저장후 나가기
 * :!q 저장안하고 나가기
 * i : insert
 * o : 아래줄
 */
