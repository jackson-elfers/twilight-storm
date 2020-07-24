module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    await this.method.errors.admin.login(data);
    return await this.method.services.admin.login(data);
  }
};
