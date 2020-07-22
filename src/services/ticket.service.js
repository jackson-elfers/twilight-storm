module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async create(data) {
    await this.method.errors.ticket.create(data);
    return await this.method.db.ticket.create(data);
  }

  async read(data) {
    await this.method.errors.ticket.read(data);
    return await this.method.db.ticket.read(data);
  }

  async remove(data) {
    await this.method.errors.ticket.remove(data);
    return await this.method.db.ticket.remove(data);
  }
};
