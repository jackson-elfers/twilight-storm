module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async login(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { username: "string", password: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async register(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { username: "string", password: "string" };
    this.method.utils.checktypes({ template: template, params: data });

    const username = this.method.config.settings.user.username;
    const password = this.method.config.settings.user.password;
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

  async readSingleId(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async usernameExists(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { username: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }

  async updateUsername(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string", username: "string" };
    this.method.utils.checktypes({ template: template, params: data });

    const username = this.method.config.settings.user.username;
    if (data.username.length < username.min) {
      throw new Error(`Username must be greater than ${username.min} characters.`);
    }
    if (data.username.length > username.max) {
      throw new Error(`Username must be less than ${username.max} characters.`);
    }
  }

  async updatePassword(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string", password: "string" };
    this.method.utils.checktypes({ template: template, params: data });

    const password = this.method.config.settings.user.password;
    if (data.password.length < password.min) {
      throw new Error(`Password must be greater than ${password.min} characters.`);
    }
    if (data.password.length > password.max) {
      throw new Error(`Password must be less than ${password.max} characters.`);
    }
  }

  async unregister(data) {
    this.method.check.assert(this.method.check.object(data), "expected object as first argument");
    const template = { _id: "string" };
    this.method.utils.checktypes({ template: template, params: data });
  }
};
