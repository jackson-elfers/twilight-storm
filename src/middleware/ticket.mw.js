module.exports = class {
  constructor(props) {
    this.method = props.method;
  }

  async admin(req, res, next) {
    try {
      const response = await this.method.services.ticket.read({ owner_id: req.user._id, role: "admin" });
      if (response.results.length === 0) {
        await this.method.services.ticket.remove({ owner_id: req.user._id, role: "admin" });
        throw new Error("this route is protected for admin only");
      }
      next();
    } catch (e) {
      console.log(e);
      res.json(this.method.utils.api.error({ status: 401, detail: "This route is protected." }));
    }
  }

  async subscribed(req, res, next) {
    try {
      const responseOne = await this.method.services.ticket.read({ owner_id: req.user._id, role: "admin" });
      const responseTwo = await this.method.services.ticket.read({ owner_id: req.user._id, role: "subscribed" });
      if (responseOne.results.length === 0 || responseTwo.results.length) {
        await this.method.services.ticket.remove({ owner_id: req.user._id, role: "admin" });
        await this.method.services.ticket.remove({ owner_id: req.user._id, role: "subscribed" });
        throw new Error("this route is protected for subscribed members");
      }
      next();
    } catch (e) {
      console.log(e);
      res.json(this.method.utils.api.error({ status: 401, detail: "This route is protected." }));
    }
  }
};
