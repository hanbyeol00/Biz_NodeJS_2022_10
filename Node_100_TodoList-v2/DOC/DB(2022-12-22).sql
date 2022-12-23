-- TOdoList DB, root 접속
create database todo;
use todo;
create table tbl_todoList(
id	BIGINT	auto_increment	PRIMARY KEY,
s_date	VARCHAR(10)	NOT NULL,
s_time	VARCHAR(10)	NOT NULL	,
t_content	VARCHAR(255)	NOT NULL,	
e_date	VARCHAR(10)		,
e_time	VARCHAR(10)		
);
DESC tbl_todoList;
DROP table tbl_todoList;
select* from tbl_todoList;

