PRAGMA foreign_keys = ON;

create table users(
    username varchar(20) not null,
    fullname varchar(40) not null,
    email varchar(40) not null,
    filename varchar(64) not null,
    password varchar(256) not null,
    created datetime default CURRENT_TIMESTAMP,
    primary key(username)
);

create table tasks(
    taskid integer primary key AUTOINCREMENT,
    owner varchar(20) not null,
    taskname varchar(64) not null,
    created datetime default CURRENT_TIMESTAMP,
    foreign key(owner) 
        references users(username) 
        on delete cascade
);

create table comments(
    commentid integer primary key AUTOINCREMENT,
    owner varchar(20),
    postid integer,
    text varchar(1024),
    created datetime default CURRENT_TIMESTAMP,
    foreign key(owner) 
        references users(username)
        on delete cascade,
    foreign key(postid) 
        references posts(postid)
        on delete cascade
);

create table likes(
    likeid integer primary key AUTOINCREMENT,
    owner varchar(20),
    postid integer,
    created datetime default CURRENT_TIMESTAMP,
    foreign key(owner)
        references users(username)
        on delete cascade,
    foreign key(postid)
        references posts(postid)
        on delete cascade
);
