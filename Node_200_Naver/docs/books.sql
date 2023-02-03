-- 나의 독서장
CREATE DATABASE myBooks;
use myBooks;
-- 리스트 검색하고, 검색 정보에서 클릭을 하면 여기에 저장
CREATE TABLE tbl_books (
	isbn	VARCHAR(13)	PRIMARY KEY,
	title	VARCHAR(125)	,
	link	VARCHAR(255)	,
	image	VARCHAR(255)	,
	author	VARCHAR(125)	,
	discount	INT	,
	publisher	VARCHAR(125)	,
	description	TEXT	,
	pubdate	VARCHAR(20)	,
	price	INT	
);

CREATE TABLE tbl_mybooks(
	my_username	VARCHAR(15)	NOT NULL,
	my_isbn	VARCHAR(13)	NOT NULL,
	my_odate	VARCHAR(15)	,
	my_opice	INT	,
	PRIMARY KEY(my_username, my_isbn)	
);

ALTER TABLE tbl_mybooks DROP CONSTRAINT f_users;
DROP table tbl_users;

CREATE TABLE tbl_users(
username	VARCHAR(15)	NOT NULL	PRIMARY KEY,
password	VARCHAR(13)	NOT NULL	,
u_name	VARCHAR(125)	NOT NULL	,
u_tel	VARCHAR(15)		,
u_addr	VARCHAR(255)		,
u_nickname	VARCHAR(125)	,
u_level	INT	
);

/*
tbl_books : tbl_mybooks = 1:N
	사용자 3명(A,B,C)이 001이라는 도서를 구입했으면
    myboos
		A 001
        B 001
        C 001
tbl_users : tbl_mybooks = 1:N

FOREING KEY 설정은 항상 N 테이블에 설정한다
*/
ALTER TABLE tbl_mybooks -- N 의 테이블
ADD CONSTRAINT f_books -- FK 이름(임의로)
FOREIGN KEY (my_isbn) -- N 테이블의 연결 칼럼
REFERENCES tbl_books(isbn); -- 1 테이블의 정보

ALTER TABLE tbl_mybooks -- N 의 테이블
ADD CONSTRAINT f_users -- FK 이름(임의로)
FOREIGN KEY (my_username) -- N 테이블의 연결 칼럼
REFERENCES tbl_users(username); -- 1 테이블의 정보

insert into tbl_users
(username, password, u_level, u_name, u_nickname)
values
("han","1234",0,"홍길동","길동이");

insert into tbl_users
(username, password, u_level, u_name, u_nickname)
values
("han11","1234",0,"성춘향","춘향이");

select * from tbl_users;
select * from tbl_mybooks;
select * from tbl_books;
select * from tbl_users;
select * from sessions;

-- TRUNCATE 명령
-- table 을 Drop 하고 다시 Create
truncate table sessions;

DESC sessions;

SHOW TABLES;

select U.username, U.u_name, M.my_isbn, M.my_odate, B.title, B.author, B.publisher 
from tbl_users U
	left join tbl_mybooks M
		on U.username = M.my_username
	left join tbl_books B
		on M.my_isbn = B.isbn
where U.username = 'han'



