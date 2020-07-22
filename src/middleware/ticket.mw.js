module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async _checkExpiration(data) {
    // check for expired tickets and remove them
  }

  async admin(req, res, next) {
    try {
      const response = this.method.services.ticket.read({ owner_id: req.user.owner_id, role: "admin" });
      if (response.results.length === 0) {
        throw new Error("this route is protected for admin only");
      }
      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      res.json(utils.api.error({ status: 401, detail: "This route is protected." }));
    }
  }

  async subscribed(req, res, next) {
    try {
      const responseOne = this.method.services.ticket.read({ owner_id: req.user.owner_id, role: "admin" });
      const responseTwo = this.method.services.ticket.read({ owner_id: req.user.owner_id, role: "subscribed" });
      if (responseOne.results.length === 0 || responseTwo.results.length) {
        throw new Error("this route is protected for subscribed members");
      }
      next();
    } catch (e) {
      console.log(e);
      res.status(401);
      res.json(utils.api.error({ status: 401, detail: "This route is protected." }));
    }
  }
};
