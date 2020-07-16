module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.category.create(data);
    return await this.method.db.category.create(data);
  }

  async readOwnerId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.category.readOwnerId(data);
    return await this.method.db.category.readOwnerId(data);
  }

  async readOwnerCategory(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.category.readOwnerCategory(data);
    return await this.method.db.category.readOwnerCategory(data);
  }

  async updateScoreUp(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.category.updateScoreUp(data);
    return await this.method.db.category.updateScoreUp(data);
  }

  async updateScoreDown(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.category.updateScoreDown(data);
    return await this.method.db.category.updateScoreDown(data);
  }
};
