module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      owner_id: "string",
      expires_at: "string",
      role: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async read(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      owner_id: "string",
      role: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      owner_id: "string",
      role: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }
};
