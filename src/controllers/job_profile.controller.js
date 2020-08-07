module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    await this.method.errors.job_profile.create(data);
    return await this.method.services.job_profile.create(data);
  }

  async update(data) {
    await this.method.errors.job_profile.update(data);
    return await this.method.services.job_profile.update(data);
  }

  async read(data) {
    await this.method.errors.job_profile.read(data);
    return await this.method.services.job_profile.read(data);
  }

  async readByOwnerId(data) {
    await this.method.errors.job_profile.readByOwnerId(data);
    return await this.method.services.job_profile.readByOwnerId(data);
  }

  async search(data) {
    await this.method.errors.job_profile.search(data);
    return await this.method.services.job_profile.search(data);
  }

  async remove(data) {
    await this.method.errors.job_profile.remove(data);
    return await this.method.services.job_profile.remove(data);
  }
};
