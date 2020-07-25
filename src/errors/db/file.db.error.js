module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      parent_id: "string",
      owner_id: "string",
      file_name: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async readByParentId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      parent_id: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async readByOwnerId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      owner_id: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = {
      owner_id: "string",
      storage_name: "string"
    };
    this.method.utils.checktypes({ template: template, params: data });
  }
};
