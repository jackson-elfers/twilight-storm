module.exports = class {
  constructor(props) {
    this.method = props.method;
    this._columns = `
bin_to_uuid(_id) _id,
bin_to_uuid(owner_id) owner_id,
bin_to_uuid(expires_at) expires_at
created_at,
updated_at,
expires_at,
role
    `;
  }

  async create(data) {
    await this.method.errors.ticket.create(data);
    const query = `
insert into ticket
values(
uuid_to_bin(?),
uuid_to_bin(?),
current_timestamp(),
current_timestamp(),
?,
?
);
`;
    const _id = this.method.uuid();
    const params = [_id, data.owner_id, data.expires_at, data.role];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params), { _id: _id });
  }

  async read(data) {
    await this.method.errors.ticket.read(data);
    const query = `
select
${this._columns}
from ticket
where owner_id = uuid_to_bin(?) and role = ?;
`;
    const params = [data.owner_id, data.role];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async remove(data) {
    await this.method.errors.ticket.remove(data);
    const query = `
delete from ticket where owner_id = uuid_to_bin(?) and role = ?;
`;
    const params = [data.owner_id, data.role];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }
};
