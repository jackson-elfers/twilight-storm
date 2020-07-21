export default class {
  constructor(props) {
    this.method = props.method;
  }

  async _validEmail(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    if (!this.method.emailValidator.validate(data.email)) {
      throw new Error("Email must be a valid email address.");
    }
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const email = this.method.config.settings.user.email;
    const password = this.method.config.settings.user.password;
    await this._validEmail(data);
    if (data.email.length < email.min) {
      throw new Error(`Email must be greater than ${email.min} characters.`);
    }
    if (data.email.length > email.max) {
      throw new Error(`Email must be less than ${email.max} characters.`);
    }
    if (data.password.length < password.min) {
      throw new Error(`Password must be greater than ${password.min} characters.`);
    }
    if (data.password.length > password.max) {
      throw new Error(`Password must be less than ${password.max} characters.`);
    }
  }

  async updateEmail(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const email = this.method.config.settings.user.email;
    await this._validEmail(data);
    if (data.email.length < email.min) {
      throw new Error(`Email must be greater than ${email.min} characters.`);
    }
    if (data.email.length > email.max) {
      throw new Error(`Email must be less than ${email.max} characters.`);
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
