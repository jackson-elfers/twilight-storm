module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    await this.method.errors.user_profile.create(data);
    return await this.method.services.user_profile.create(data);
  }

  async resolve(data) {
    await this.method.errors.user_profile.resolve(data);
    return await this.method.services.user_profile.resolve(data);
  }

  async read(data) {
    await this.method.errors.user_profile.read(data);
    return await this.method.services.user_profile.read(data);
  }

  async update(data) {
    await this.method.errors.user_profile.update(data);
    return await this.method.services.user_profile.update(data);
  }

  async search(data) {
    await this.method.errors.user_profile.search(data);
    return await this.method.services.user_profile.search(data);
  }
};
