// X-Naver-Client-Id: {애플리케이션 등록 시 발급받은 클라이언트 아이디 값}
// X-Naver-Client-Secret: {애플리케이션 등록 시 발급받은 클라이언트 시크릿 값}
const CLIENT_ID = { KEY: "X-Naver-Client-Id", VALUE: "0SEzfbdFf7ZeWLetwSn6" };
const CLIENT_SECRET = {
  KEY: "X-Naver-Client-Secret",
  VALUE: "CWljdk93N3",
};
const BOOK_URL_JSON = "https://openapi.naver.com/v1/search/book.json";

const NAVER = {
  CLIENT_ID,
  CLIENT_SECRET,
  BOOK_URL_JSON,
};

export default NAVER;
export { CLIENT_ID, CLIENT_SECRET, BOOK_URL_JSON };
