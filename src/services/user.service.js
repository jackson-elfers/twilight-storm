module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    await this.method.errors.user.login(data);
    data.email = data.email.toLowerCase();
    const user = await this.method.db.user.readSingleEmail(data);
    this.method.check.assert(user.results.length !== 0, "email doesn't exist");
    this.method.check.assert(
      await this.method.utils.bcrypt.compare(data.password, user.results[0].password),
      "password is incorrect"
    );
    await this.method.db.user.updateLoginAt(user.results[0]);
    return {
      jwt: await this.method.utils.jwt.sign({
        _id: user.results[0]._id,
        email: user.results[0].email
      })
    };
  }

  async register(data) {
    await this.method.errors.user.register(data);
    data.email = data.email.toLowerCase();
    const user = await this.method.db.user.readSingleEmail(data);
    this.method.check.assert(user.results.length === 0, "email must be unique");
    return {
      _id: (
        await this.method.db.user.create({
          email: data.email,
          password: await this.method.utils.bcrypt.hash(data.password)
        })
      ).info._id
    };
  }

  async readSingleId(data) {
    await this.method.errors.user.readSingleId(data);
    return await this.method.db.user.readSingleId(data);
  }

  async emailExists(data) {
    await this.method.errors.user.emailExists(data);
    data.email = data.email.toLowerCase();
    return await this.method.db.user.emailExists(data);
  }

  async updateEmail(data) {
    await this.method.errors.user.updateEmail(data);
    const user = await this.method.db.user.readSingleEmail(data);
    this.method.check.assert(user.results.length === 0, "email must be unique");
    data.email = data.email.toLowerCase();
    await this.method.db.user.updateEmail(data);
  }

  async updatePassword(data) {
    await this.method.errors.user.updatePassword(data);
    data.password = await this.method.utils.bcrypt.hash(data.password);
    await this.method.db.user.updatePassword(data);
  }

  async unregister(data) {
    await this.method.errors.user.unregister(data);
    await this.method.db.user.unregister(data);
  }
};
