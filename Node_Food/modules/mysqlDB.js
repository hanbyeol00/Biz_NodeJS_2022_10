import mysql from "mysql2";

const mysqlOption = {
  host: "localhost",
  user: "root",
  password: "!Biz8080",
  database: "foodDB",
};
const mysqlConn = mysql.createConnection(mysqlOption);

export default mysqlConn;
