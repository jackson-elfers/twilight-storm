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

(ticket)

create table if not exists ticket(
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

(file)

create table if not exists file(
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

## sql routes

### user ...

### ticket

```
bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
bin_to_uuid(expires_at) expires_at
created_at,
updated_at,
expires_at,
role

(create)

insert into ticket
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?
);

(read)

select
${this._columns}
from ticket
where owner_id = uuid_to_bin(?) and role = ?;

(remove)

delete from ticket where owner_id = uuid_to_bin(?) and role = ?;

```

### user_profile

```
bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
url_title,
first_name,
last_name,
city,
state,
street,
zip,
work_phone,
work_email,
title,
summary,
keywords

(create)

insert into user_profile
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?,
?
);

(read)

select
${this._columns}
from user_profile
where url_title = ?;

(update)

update user_profile
updated_at = current_timestamp(),
url_title = ?,
first_name = ?,
last_name = ?,
city = ?,
state = ?,
street = ?,
zip = ?,
work_phone = ?,
work_email = ?,
title = ?,
summary = ?
keywords = ?
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

(search)

select
${this._columns}
from user_profile
where first_name = %?% or last_name = %?% or city = %?% or state = %?% or street = %?% or zip = %?% or title = %?% or keywords = %?%
order by created_at desc limit ${index * offset}, ${offset};

```

### job_profile

```
bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
url_title,
first_name,
last_name,
city,
state,
street,
zip,
work_phone,
work_email,
title,
summary,
keywords

(create)

insert into user_profile
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?,
?,
?,
?,
?,
?,
?,
?,
?
);

(read)

select
${this._columns}
from job_profile
where url_title = ?;

(readByOwnerId)

select
${this._columns}
from job_profile
where owner_id = uuid_to_bin(?);

(update)

update user_profile
updated_at = current_timestamp(),
url_title = ?,
city = ?,
state = ?,
street = ?,
zip = ?,
work_phone = ?,
work_email = ?,
title = ?,
summary = ?
keywords = ?
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

(remove)

delete from job_profile where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);

(search)

select
${this._columns}
from user_profile
where first_name = %?% or last_name = %?% or city = %?% or state = %?% or street = %?% or zip = %?% or title = %?% or keywords = %?%
order by created_at desc limit ${index * offset}, ${offset};

```

### file

```
bin_to_uuid(_id) _id,
bin_to_uuid(parent_id) parent_id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
content_type
file_name
storage_name

(create)

insert into file
values(
uuid_to_bin(?),
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?,
?
);

(readByParentId)

select
${this._columns}
from file
where parent_id = uuid_to_bin(?);

(readByOwnerId)

select
${this._columns}
from file
where owner_id = uuid_to_bin(?);

(remove)

delete from file where owner_id = uuid_to_bin(?) and storage_name = ?;

```

## routes

```
(client)

home: /
profile: /profile/:url_title
update profile: /profile/edit/:url_title
upload resume: /upload/resume/:url_title
job create: /job/create
job update: /job/update/:url_title
job delete: /job/delete/:url_title
search profile: /search/profile/:index/:search_query
search job: /search/job/:index/:search_query
admin: /admin/login

(user)

login: POST /api/user/login
logout: GET /api/user/logout
readSingleId: GET /api/user/read/id
usernameExists: GET /api/user/exists/username
info: GET /api/user/info
register: POST /api/user/register
updateUsername: PUT /api/user/update/username
updatePassword: PUT /api/user/update/password
unregister: DELETE /api/user/unregister

(admin)

login: POST /api/admin/login
validate: GET /api/admin/validate

(user_profile)

read: GET /api/job/read/:url_title
update: PUT /api/profile/update (secured)
search: GET /api/profile/search/:index/:offset/:search_query

(job_profile)

create: POST /api/job/create (secured)
read: GET /api/job/read/:url_title
readByOwnerId: GET /api/job/read/owner/:owner_id
update: PUT /api/job/update (secured)
remove: DELETE /api/job/delete (secured)
search: GET /api/job/search/:index/:offset/:search_query

(file)

uploadResume: POST /api/file/upload/resume (secured)
readByParentId: GET /api/file/read/parent_id/:parent_id
readByStorageName: GET /api/file/read/:storage_name
remove: DELETE /api/file/delete (secured)

(internal services)

removeByParentId:
removeByUserId:
```
