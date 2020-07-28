module.exports = class {
  constructor(props) {
    this.method = props.method;
    this._columns = `
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
    `;
  }

  async create(data) {
    await this.method.errors.user_profile.create(data);

    const short_title = data.title
      .split(" ")
      .slice(0, 12)
      .join(" ")
      .toLowerCase();
    const url_title = `${this.method.urlify(short_title)}-${this.method.shortid.generate()}`;

    const query = `
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
`;
    const _id = this.method.uuid();
    const params = [
      _id,
      data.owner_id,
      url_title,
      data.first_name,
      data.last_name,
      data.city,
      data.state,
      data.street,
      data.zip,
      data.work_phone,
      data.work_email,
      data.title,
      data.summary,
      data.keywords
    ];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params), {
      _id: _id,
      url_title: url_title
    });
  }

  async read(data) {
    await this.method.errors.user_profile.read(data);
    const query = `
select
${this._columns}
from user_profile
where url_title = ?;
`;
    const params = [data.url_title];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }

  async update(data) {
    await this.method.errors.user_profile.update(data);

    const short_title = data.title
      .split(" ")
      .slice(0, 12)
      .join(" ")
      .toLowerCase();
    const url_title = `${this.method.urlify(short_title)}-${this.method.shortid.generate()}`;

    const query = `
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
summary = ?,
keywords = ?
where owner_id = uuid_to_bin(?) and _id = uuid_to_bin(?);
`;
    const params = [
      url_title,
      data.first_name,
      data.last_name,
      data.city,
      data.state,
      data.street,
      data.zip,
      data.work_phone,
      data.work_email,
      data.title,
      data.summary,
      data.keywords,
      data.owner_id,
      data._id
    ];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params), {
      url_title: url_title
    });
  }

  async search(data) {
    await this.method.errors.user_profile.search(data);

    var where = "";
    data.search_query.split.map((d, i) => {
      where += ` ${this.method.sqlstring.escape(
        `first_name like %${d}% or last_name like %${d}% or city like %${d}% or state like %${
          d.state
        }% or street like %${d}% or zip like %${d}% or title like %${d}% or ${d
          .split(" ")
          .map((d, i) => {
            return ` or like %${d}% `;
          })
          .join("")} `
      )} `;
    });

    const index = this.method.sqlstring.escape(data.index);
    const offset = this.method.sqlstring.escape(data.offset);
    const query = `
select
${this._columns}
from user_profile
${where}
order by created_at desc limit ${index * offset}, ${offset};
`;
    const params = [];
    return await this.method.utils.db.query(this.method.sqlstring.format(query, params));
  }
};
