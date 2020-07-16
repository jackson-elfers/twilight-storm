module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  // helpers

  async readSingleUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { username: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  // controllers

  async login(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { username: "string", password: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { username: "string", password: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async readSingleId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async usernameExists(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { username: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string", username: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string", password: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async updateLoginAt(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async unregister(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }
};
