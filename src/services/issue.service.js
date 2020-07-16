module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  // helpers

  indexToCategories(data) {
    var temp = [];
    data.categories.map((d, i) => {
      temp.push(this.method.config.categories[data.categories[i]]);
    });
    return temp.join("#");
  }

  async readSingleOwnerId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.readSingleOwnerId(data);
    return await this.method.db.issue.readSingleOwnerId(data);
  }

  async readUnresolvedIssue(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.readUnresolvedIssue(data);
    var response = await this.method.db.issue.readUnresolvedCategories(data);
    if (response.results.length !== 0) {
      return response;
    }
    return await this.method.db.issue.readUnresolvedAny(data);
  }

  // services

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.create(data);
    data.categories = this.indexToCategories(data);
    return await this.method.db.issue.create(data);
  }

  async findIssue(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.findIssue(data);
    return await this.readUnresolvedIssue(data);
  }

  async resolvedDate(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.resolvedDate(data);
    return await this.method.db.issue.resolvedDate(data);
  }

  async resolvedCategory(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.resolvedCategory(data);
    return await this.method.db.issue.resolvedCategory(data);
  }

  async unresolvedOwner(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.unresolvedOwner(data);
    return await this.method.db.issue.unresolvedOwner(data);
  }

  async resolvedOwner(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.resolvedOwner(data);
    return await this.method.db.issue.resolvedOwner(data);
  }

  async readSingleUrlTitle(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.readSingleUrlTitle(data);
    return await this.method.db.issue.readSingleUrlTitle(data);
  }

  async readSingleId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.readSingleId(data);
    return await this.method.db.issue.readSingleId(data);
  }

  async update(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.update(data);
    data.categories = this.indexToCategories(data);
    return await this.method.db.issue.update(data);
  }

  async resolved(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.resolved(data);
    return await this.method.db.issue.resolved(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.issue.remove(data);
    return await this.method.db.issue.remove(data);
  }
};
