create table if not exists teacher(
    id identity not null primary key,
    username varchar(100) not null,
    password varchar(100) not null
);

create table if not exists student(
    id identity not null primary key,
    username varchar(100) not null,
    password varchar(100) not null
);

create table if not exists class(
    id identity not null primary key,
	name varchar(100),
	owner int,
	foreign key (owner) references teacher(id)
);

create table if not exists class_student(
    id identity not null primary key,
    class_id int,
    student_id int,
    foreign key (class_id) references class(id),
    foreign key (student_id) references class(id)
);

create table if not exists task(
    id identity not null primary key,
    title varchar(150) not null,
    description varchar(300),
    createdBy int not null,
    foreign key (createdBy) references teacher(id)
);

create table if not exists task_student(
    id identity not null primary key,
    task_id int,
    student_id int,
    status varchar(25),
    foreign key (task_id) references task(id),
    foreign key (student_id) references student(id)
);
