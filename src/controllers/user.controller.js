module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    await this.method.errors.user.login(data);
    return await this.method.services.user.login(data);
  }

  async register(data) {
    await this.method.errors.user.register(data);
    return await this.method.services.user.register(data);
  }

  async readSingleId(data) {
    await this.method.errors.user.readSingleId(data);
    return await this.method.services.user.readSingleId(data);
  }

  async emailExists(data) {
    await this.method.errors.user.emailExists(data);
    return await this.method.services.user.emailExists(data);
  }

  async updateEmail(data) {
    await this.method.errors.user.updateEmail(data);
    this.method.errors.user.updateEmail(data);
    await this.method.services.user.updateEmail(data);
  }

  async updatePassword(data) {
    await this.method.errors.user.updatePassword(data);
    this.method.errors.user.updatePassword(data);
    await this.method.services.user.updatePassword(data);
  }

  async unregister(data) {
    await this.method.errors.user.unregister(data);
    await this.method.services.user.unregister(data);
  }
};
