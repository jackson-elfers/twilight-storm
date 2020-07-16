module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  // helpers
  async removeUserComments(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.comment.removeUserComments(data);
    return await this.method.db.comment.removeUserComments(data);
  }

  async readDistinctComments(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.comment.readDistinctComments(data);
    return await this.method.db.comment.readDistinctComments(data);
  }

  // services
  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.comment.create(data);
    return await this.method.db.comment.create(data);
  }

  async read(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.comment.read(data);
    return await this.method.db.comment.read(data);
  }

  async update(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.comment.update(data);
    return await this.method.db.comment.update(data);
  }

  async remove(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.comment.remove(data);
    return await this.method.db.comment.remove(data);
  }
};
