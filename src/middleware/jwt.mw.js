module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async secured(req, res, next) {
    try {
      this.method.check.assert(req.cookies.hasOwnProperty("Authorization"), "'Authorization' key missing from cookies");
      req.user = await this.method.utils.jwt.decode(req.cookies.Authorization);
      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      res.json(utils.api.error({ status: 401, detail: "This route is protected." }));
    }
  }
};
