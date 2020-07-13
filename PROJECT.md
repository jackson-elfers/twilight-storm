models:
user
auth
user_profile
job_profile
files

## sql tables

```
(user)

create table if not exists user(
_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
login_at datetime not null,
email varchar(255) not null unique,
username varchar(255) not null unique,
password varchar(255) not null,
primary key (_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

(auth)

create table if not exists auth(
_id binary(16) not null,
owner_id binary(16) not null,
expires_at datetime,
created_at datetime not null,
updated_at datetime not null,
role varchar(255) not null,
primary key (_id),
foreign key (owner_id)
references user (_id)
on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

(user_profile)

create table if not exists user_profile(
_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
first_name varchar(255),
last_name varchar(255),
city varchar(255),
state varchar(255),
street varchar(255),
zip varchar(255),
work_phone varchar(255),
work_email varchar(255),
title varchar(255),
summary text,
keywords varchar(1000),
primary key (_id),
foreign key (owner_id)
references user (_id)
on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

(job_profile)

create table if not exists job_profile(
_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
city varchar(255),
state varchar(255),
street varchar(255),
zip varchar(255),
title varchar(255),
summary text,
keywords varchar(1000),
primary key (_id),
foreign key (owner_id)
references user (_id)
on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

(files)

create table if not exists files(
_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
content_type varchar(255) not null,
file_name varchar(255) not null,
storage_name varchar(255) not null,
primary key (_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

```
