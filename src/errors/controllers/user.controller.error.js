module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  // helpers

  async _validEmail(data) {}

  // errors

  async login(data) {}

  async register(data) {}

  async readSingleId(data) {}

  async emailExists(data) {}

  async updateEmail(data) {}

  async updatePassword(data) {}

  async unregister(data) {}
};
