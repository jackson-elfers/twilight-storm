module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    await this.method.errors.user_profile.create(data);
    return await this.method.db.user_profile.create(data);
  }

  async update(data) {
    await this.method.errors.user_profile.update(data);
    return await this.method.db.user_profile.update(data);
  }

  async read(data) {
    await this.method.errors.user_profile.read(data);
    return await this.method.db.user_profile.read(data);
  }

  async search(data) {
    await this.method.errors.user_profile.search(data);
    return await this.method.db.user_profile.search(data);
  }
};
