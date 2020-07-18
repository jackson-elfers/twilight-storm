export default class {
  constructor(props) {
    this.method = props.method;
  }

  async _validEmail(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    if (!this.method.emailValidator.validate(data.username)) {
      throw new Error("Username must be a valid email address.");
    }
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const username = this.method.config.settings.user.username;
    const password = this.method.config.settings.user.password;
    await this._validEmail(data);
    if (data.username.length < username.min) {
      throw new Error(`Username must be greater than ${username.min} characters.`);
    }
    if (data.username.length > username.max) {
      throw new Error(`Username must be less than ${username.max} characters.`);
    }
    if (data.password.length < password.min) {
      throw new Error(`Password must be greater than ${password.min} characters.`);
    }
    if (data.password.length > password.max) {
      throw new Error(`Password must be less than ${password.max} characters.`);
    }
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const username = this.method.config.settings.user.username;
    await this._validEmail(data);
    if (data.username.length < username.min) {
      throw new Error(`Username must be greater than ${username.min} characters.`);
    }
    if (data.username.length > username.max) {
      throw new Error(`Username must be less than ${username.max} characters.`);
    }
  }

  updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const password = this.method.config.settings.user.password;
    if (data.password.length < password.min) {
      throw new Error(`Password must be greater than ${password.min} characters.`);
    }
    if (data.password.length > password.max) {
      throw new Error(`Password must be less than ${password.max} characters.`);
    }
  }
}
