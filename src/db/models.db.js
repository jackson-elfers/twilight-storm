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
username varchar(255) not null unique,
password varchar(255) not null,
primary key (_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
`;
    await this.method.utils.db.query(query);
  }
};
