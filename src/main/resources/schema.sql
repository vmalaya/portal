create table if not exists user(
    id identity not null primary key,
    username varchar(100) not null,
    password varchar(100) not null,
    role varchar(20) not null
);

create table if not exists group(
    id identity not null primary key,
	name varchar(100)
);

create table if not exists user_group(
    id identity not null primary key,
    group_id int,
    user_id int,
    foreign key (group_id) references group(id),
    foreign key (user_id) references group(id)
)
create table if not exists task(
    id identity not null primary key,
    title varchar(150) not null,
    description varchar(300),
    createdBy int not null,
    status varchar(25),
    foreign key (createdBy) references user(id)
);
create table if not exists task_assignee(
    id identity not null primary key,
    task_id int,
    user_id int,
    group_id int
    foreign key (task_id) references task(id),
    foreign key (user_id) references user(id),
    foreign key (group_id) references group(id),
);