drop database if exists projectManager;
create database projectManager;
use projectManager;

create table rol(
	id int auto_increment primary key,
    name char(50) not null unique,
    description char(255) not null
);

create table user(
	id int auto_increment primary key,
    username char(80) not null,
    password char(255) not null,
    fullname char(150) not null,
    create_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp ,
    rol_id int references rol(id)
);

create table project(
	id int auto_increment primary key,
    name char(100) not null,
    leader_id int references user(id),
    description char(255) not null,
    create_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp 
);

create table project_miembros(
	project_id int references project(id) on delete cascade,
    user_id int references user(id) on delete cascade,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (project_id,user_id)
);

create table task(
	id int auto_increment primary key,
    name char(100) not null,
    description char(255) not null,
    create_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp on update current_timestamp ,
    project_id int references project(id) on delete cascade
);

create table task_assignment(
	task_id int references task(id) on delete cascade,
    user_id int references user(id) on delete cascade,
    primary key(task_id, user_id)
)

