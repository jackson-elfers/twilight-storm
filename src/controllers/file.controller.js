module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    await this.method.errors.file.create(data);
    return await this.method.db.file.create(data);
  }

  async readByParentId(data) {
    await this.method.errors.file.readByParentId(data);
    return await this.method.db.file.readByParentId(data);
  }

  async readByStorageName(data) {
    await this.method.errors.file.readByStorageName(data);
    return await this.method.services.files.readByStorageName(data);
  }

  async remove(data) {
    await this.method.errors.file.remove(data);
    return await this.method.db.file.remove(data);
  }
};
