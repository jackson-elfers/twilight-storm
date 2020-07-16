module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.error.report.create(data);
    return await this.method.db.report.create(data);
  }

  async read(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.error.report.read(data);
    return await this.method.db.report.read(data);
  }
};
