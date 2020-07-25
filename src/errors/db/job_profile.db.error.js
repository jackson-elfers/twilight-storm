module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      owner_id: "string",
      first_name: "string",
      last_name: "string",
      city: "string",
      state: "string",
      street: "string",
      zip: "string",
      work_phone: "string",
      work_email: "string",
      title: "string",
      summary: "string",
      keywords: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async read(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { url_title: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async update(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      _id: "string",
      owner_id: "string",
      first_name: "string",
      last_name: "string",
      city: "string",
      state: "string",
      street: "string",
      zip: "string",
      work_phone: "string",
      work_email: "string",
      title: "string",
      summary: "string",
      keywords: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async search(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { search_query: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { owner_id: "string", _id: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }
};
