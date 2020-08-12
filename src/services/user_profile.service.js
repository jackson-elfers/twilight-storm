module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    await this.method.errors.user_profile.create(data);
    return await this.method.db.user_profile.create(data);
  }

  async resolve(data) {
    await this.method.errors.user_profile.resolve(data);
    return await this.method.db.user_profile.resolve(data);
  }

  async read(data) {
    await this.method.errors.user_profile.read(data);
    return await this.method.db.user_profile.read(data);
  }

  async readByOwnership(data) {
    await this.method.errors.user_profile.readByOwnership(data);
    return await this.method.db.user_profile.readByOwnership(data);
  }

  async update(data) {
    await this.method.errors.user_profile.update(data);
    return await this.method.db.user_profile.update(data);
  }

  async search(data) {
    await this.method.errors.user_profile.search(data);
    return await this.method.db.user_profile.search(data);
  }
};
