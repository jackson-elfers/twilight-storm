module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    await this.method.errors.user.create(data);
    const query = `
insert into user
values(
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
current_timestamp(),
?,
?
);
`;
    const _id = this.method.uuid();
    const params = [_id, data.email, data.password];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params), { _id: _id });
  }

  async readSingleEmail(data) {
    await this.method.errors.user.readSingleEmail(data);
    const query = `
select
bin_to_uuid(_id) _id,
created_at,
updated_at,
login_at,
email,
password
from user
where email = ?;
`;
    const params = [data.email];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async readSingleId(data) {
    await this.method.errors.user.readSingleId(data);
    const query = `
select
email
from user
where _id = uuid_to_bin(?);
`;
    const params = [data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async emailExists(data) {
    await this.method.errors.user.emailExists(data);
    const query = `
select
email
from user
where email = ?;
`;
    const params = [data.email];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async updateEmail(data) {
    await this.method.errors.user.updateEmail(data);
    const query = `
update user set
updated_at = current_timestamp(),
email = ?
where _id = uuid_to_bin(?);
`;
    const params = [data.email, data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async updatePassword(data) {
    await this.method.errors.user.updatePassword(data);
    const query = `
update user set
updated_at = current_timestamp(),
password = ?
where _id = uuid_to_bin(?);
`;
    const params = [data.password, data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async updateLoginAt(data) {
    await this.method.errors.user.updateLoginAt(data);
    const query = `
update user set
updated_at = current_timestamp(),
login_at = current_timestamp()
where _id = uuid_to_bin(?);
`;
    const params = [data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async unregister(data) {
    await this.method.errors.user.unregister(data);
    const query = `
delete from user where _id = uuid_to_bin(?)
`;
    const params = [data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }
};
