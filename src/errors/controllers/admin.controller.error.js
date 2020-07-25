module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { email: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }
};
