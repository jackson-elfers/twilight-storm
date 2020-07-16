module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.login(data);
    return await this.method.services.user.login(data);
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.register(data);
    return await this.method.services.user.register(data);
  }

  async readSingleId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.readSingleId(data);
    return await this.method.services.user.readSingleId(data);
  }

  async usernameExists(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.usernameExists(data);
    return await this.method.services.user.usernameExists(data);
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.updateUsername(data);
    this.method.errors.user.updateUsername(data);
    await this.method.services.user.updateUsername(data);
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.updatePassword(data);
    this.method.errors.user.updatePassword(data);
    await this.method.services.user.updatePassword(data);
  }

  async unregister(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.unregister(data);
    await this.method.services.user.unregister(data);
  }
};
