DESC board_detail;
DROP table comment;
select* from animal_hospital;
create table animal_hospital(
a_id	BIGINT	AUTO_INCREMENT	PRIMARY KEY,
a_name	VARCHAR(50)		,
a_add	VARCHAR(255)	,	
a_road_add	VARCHAR(255),		
a_tel	VARCHAR(100)	,	
a_x	double	NOT NULL	,
a_y	double	NOT NULL	
);
insert xytable(X,Y) values(190562.9092,189333.0171);

create table user(
u_user_id	VARCHAR(50)		PRIMARY KEY,
u_password	VARCHAR(50)	NOT NULL	,
u_email	VARCHAR(50)	NOT NULL	,
u_nick_name	VARCHAR(20)	NOT NULL	UNIQUE,
u_img	VARCHAR(255)		,
u_level	INT		,
u_create_date	VARCHAR(255)	NOT NULL	,
u_delete_date	VARCHAR(255)		
);

create table board_detail(
seq	BIGINT	AUTO_INCREMENT,
b_nickname	VARCHAR(20)		,
b_title	VARCHAR(255)	NOT NULL	,
b_content	TEXT	NOT NULL	,
b_views	INT		DEFAULT 0,
b_create_date	VARCHAR(255)	NOT NULL	,
b_update_date	VARCHAR(255)		,
b_delete_date	VARCHAR(255)		,
user_id	VARCHAR(50)		,
			PRIMARY KEY(seq,user_id)
);

create table board_images(
i_seq	INT	NOT NULL,
i_img	VARCHAR(255)	NOT NULL,
		PRIMARY KEY(i_seq,i_img)
);

create table comment(
c_seq	BIGINT	AUTO_INCREMENT	NOT NULL,
board_seq	INT	NOT NULL	,
c_nickname	VARCHAR(20)		,
c_content	VARCHAR(255)	NOT NULL	,
c_create_date	VARCHAR(255)	NOT NULL	,
c_update_date	VARCHAR(255)		,
c_delete_date	VARCHAR(255)		,
			PRIMARY KEY(c_seq,board_seq)
);

create table re_comment(
r_recommseq	BIGINT	NOT NULL	,
seq	INT	NOT NULL	,
r_nickname	VARCHAR(20)		,
r_content	VARCHAR(255)	NOT NULL	,
r_create_date	VARCHAR(255)	NOT NULL	,
r_update_date	VARCHAR(255)		,
r_delete_date	VARCHAR(255)		,
			PRIMARY KEY(r_recommseq,seq)
);

create table tbl_like(
board_seq	INT	NOT NULL	,
user_id	VARCHAR(50)		,
like_yn VARCHAR(5)			,
			PRIMARY KEY(board_seq,user_id)
);
select * from board_detail;
select * from board_detail where b_title AND b_content like '%가나다%';

update board_detail set b_views = b_views +1   where seq = 1;


