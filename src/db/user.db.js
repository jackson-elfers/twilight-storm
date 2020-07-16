module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.register(data);
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
    const params = [_id, data.username, data.password];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params), { _id: _id });
  }

  async readSingleUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.readSingleUsername(data);
    const query = `
select
bin_to_uuid(_id) _id,
created_at,
updated_at,
login_at,
username,
password
from user
where username = ?;
`;
    const params = [data.username];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async readSingleId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.readSingleId(data);
    const query = `
select
username
from user
where _id = uuid_to_bin(?);
`;
    const params = [data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async usernameExists(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.usernameExists(data);
    const query = `
select
username
from user
where username = ?;
`;
    const params = [data.username];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.updateUsername(data);
    const query = `
update user set
updated_at = current_timestamp(),
username = ?
where _id = uuid_to_bin(?);
`;
    const params = [data.username, data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
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
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
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
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.unregister(data);
    const query = `
delete from user where _id = uuid_to_bin(?)
`;
    const params = [data._id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }
};
