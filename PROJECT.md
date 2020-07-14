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
url_title varchar(1000),
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
url_title varchar(1000),
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
parent_id binary(16) not null,
owner_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
content_type varchar(255) not null,
file_name varchar(255) not null,
storage_name varchar(255) not null,
primary key (_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;

```

## routes

```
# client

home: /
profile: /profile/:url_title
update profile: /profile/edit/:url_title
upload resume: /upload/resume/:url_title
job create: /job/create
job update: /job/update/:url_title
job delete: /job/delete/:url_title
search profile: /search/profile/:index/:search_query
search job: /search/job/:index/:search_query
admin: /admin

# user

create: POST /api/user/create
read: GET /api/user/read/username
readSingleId: GET /api/user/read/single/:_id
updateUsername: PUT /api/user/update/username (secured)
updatePassword: PUT /api/user/update/password (secured)
remove: DELETE /api/user/delete (secured)

# user_profile

update: PUT /api/profile/update (secured)
search: GET /api/profile/search/:index/:offset/:search_query

# job_profile

create: POST /api/job/create (secured)
read: GET /api/job/read/:url_title
readByOwnerId: GET /api/job/read/owner/:owner_id
update: PUT /api/job/update (secured)
remove: DELETE /api/job/delete (secured)
search: GET /api/job/search/:index/:offset/:search_query

# files

uploadResume: POST /api/files/upload/resume (secured)
read: GET /api/files/read/:_id
readByParentId: GET /api/files/read/parent_id/:parent_id
remove: DELETE /api/files/delete (secured)

(Internal Services)
removeByParentId:
removeByUserId:
```
