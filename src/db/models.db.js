module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async user() {
    const query = `
create table if not exists user(
_id binary(16) not null,
created_at datetime not null,
updated_at datetime not null,
login_at datetime not null,
email varchar(255) not null unique,
password varchar(255) not null,
primary key (_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
`;
    await this.method.utils.db.query(query);
  }

  async ticket() {
    const query = `
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
`;
    await this.method.utils.db.query(query);
  }

  async user_profile() {
    const query = `
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
`;
    await this.method.utils.db.query(query);
  }

  async job_profile() {
    const query = `
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
`;
    await this.method.utils.db.query(query);
  }

  async file() {
    const query = `
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
`;
    await this.method.utils.db.query(query);
  }
};
