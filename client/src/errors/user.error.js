export default class {
  constructor(props) {
    this.method = props.method;
  }

  register(data) {
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

  updateUsername(data) {
    const username = this.method.config.settings.user.username;
    if (data.username.length < username.min) {
      throw new Error(`Username must be greater than ${username.min} characters.`);
    }
    if (data.username.length > username.max) {
      throw new Error(`Username must be less than ${username.max} characters.`);
    }
  }

  updatePassword(data) {
    const password = this.method.config.settings.user.password;
    if (data.password.length < password.min) {
      throw new Error(`Password must be greater than ${password.min} characters.`);
    }
    if (data.password.length > password.max) {
      throw new Error(`Password must be less than ${password.max} characters.`);
    }
  }
}
