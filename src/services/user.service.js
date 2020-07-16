module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.login(data);
    data.username = data.username.toLowerCase();
    const user = await this.method.db.user.readSingleUsername(data);
    this.method.check.assert(user.results.length !== 0, "username doesn't exist");
    this.method.check.assert(
      await this.method.utils.bcrypt.compare(data.password, user.results[0].password),
      "password is incorrect"
    );
    await this.method.db.user.updateLoginAt(user.results[0]);
    return {
      jwt: await this.method.utils.jwt.sign({
        _id: user.results[0]._id,
        username: user.results[0].username
      })
    };
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.register(data);
    data.username = data.username.toLowerCase();
    const user = await this.method.db.user.readSingleUsername(data);
    this.method.check.assert(user.results.length === 0, "username must be unique");
    return {
      _id: (
        await this.method.db.user.create({
          username: data.username,
          password: await this.method.utils.bcrypt.hash(data.password)
        })
      ).info._id
    };
  }

  async readSingleId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.readSingleId(data);
    return await this.method.db.user.readSingleId(data);
  }

  async usernameExists(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.usernameExists(data);
    data.username = data.username.toLowerCase();
    return await this.method.db.user.usernameExists(data);
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.updateUsername(data);
    const user = await this.method.db.user.readSingleUsername(data);
    this.method.check.assert(user.results.length === 0, "username must be unique");
    data.username = data.username.toLowerCase();
    await this.method.db.user.updateUsername(data);
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.updatePassword(data);
    data.password = await this.method.utils.bcrypt.hash(data.password);
    await this.method.db.user.updatePassword(data);
  }

  async unregister(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    await this.method.errors.user.unregister(data);
    await this.method.db.user.unregister(data);
  }
};
