module.exports = class {
  constructor(props) {
    this.method = props.method;
    this._columns = `
bin_to_uuid(_id) _id,
bin_to_uuid(parent_id) parent_id,
bin_to_uuid(owner_id) owner_id,
created_at,
updated_at,
content_type
file_name
storage_name
    `;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.file.create(data);
    const query = `
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
`;
    const _id = this.method.uuid();
    const content_type = this.method.mime.lookup(data.file_name);
    const storage_name = `${_id}.${this.method.mime.extension(content_type)}`;
    const params = [_id, data.parent_id, data.owner_id, content_type, data.file_name, storage_name];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params), { storage_name: storage_name, content_type: content_type });
  }

  async readByParentId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.file.readByParentId(data);
    const query = `
select
${this._columns}
from file
where parent_id = uuid_to_bin(?);
`;
    const params = [data.parent_id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }
  
  async readByOwnerId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.file.readByOwnerId(data);
    const query = `
select
${this._columns}
from file
where owner_id = uuid_to_bin(?);
`;
    const params = [data.owner_id];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.file.remove(data);
    const query = `
delete from file where owner_id = uuid_to_bin(?) and storage_name = ?;
`;
    const params = [data.owner_id, data.storage_name];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }
};
