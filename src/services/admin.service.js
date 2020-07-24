module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    await this.method.errors.admin.login(data);
    const user = await this.method.db.user.readSingleId(data);
    this.method.check.assert(user.results.length !== 0, "user_id doesn't exist");
    await this.method.db.user.updateLoginAt(user.results[0]);
    return {
      jwt: await this.method.utils.jwt.sign({
        _id: user.results[0]._id,
        email: user.results[0].email
      })
    };
  }
};
