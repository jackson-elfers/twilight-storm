module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async verifyToken(data) {
    const response = await this.method.axios.post("https://www.google.com/recaptcha/api/siteverify", null, {
      params: data
    });
    if (!response.data.success) {
      throw new Error(response["error-codes"]);
    }
  }

  async verify(req, res, next) {
    try {
      await this.verifyToken({ secret: process.env.RECAPTCHA_SECRET_KEY, response: req.body.recaptcha_token });
      next();
    } catch (e) {
      console.log(e);
      res.json(utils.api.error({ status: 401, detail: "Recaptcha failed to verify." }));
    }
  }
};
