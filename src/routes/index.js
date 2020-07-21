const user = require("./user");
const client = require("./client");

const utils = require("../utils");
const mw = require("../middleware/index.js");
const config = require("../config");

module.exports = function(app) {
  // user
  app.post(config.api.user.login, utils.asyn.route(user.login));
  app.get(config.api.user.logout, user.logout);
  app.get(`${config.api.user.readSingleId}/:_id`, user.readSingleId);
  app.get(`${config.api.user.emailExists}/:email`, user.emailExists);
  app.get(config.api.user.info, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user.info));
  app.post(
    config.api.user.register,
    utils.asyn.route(mw.recaptcha.verify.bind(mw.recaptcha)),
    utils.asyn.route(user.register)
  );
  app.put(config.api.user.updateEmail, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user.updateEmail));
  app.put(config.api.user.updatePassword, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user.updatePassword));
  app.delete(config.api.user.unregister, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user.unregister));

  // client
  app.get("/", client.home);
  app.get("*", client.home);
};
