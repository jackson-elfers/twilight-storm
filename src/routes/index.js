const utils = require("../utils");
const user = require("./user");
const client = require("./client");
const config = require("../config");

module.exports = function(app) {
  // user
  app.post(config.api.user.login, utils.asyn.route(user.login));
  app.get(config.api.user.logout, user.logout);
  app.get(`${config.api.user.readSingleId}/:_id`, user.readSingleId);
  app.get(`${config.api.user.usernameExists}/:username`, user.usernameExists);
  app.get(config.api.user.info, utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.info));
  app.post(config.api.user.register, utils.recaptcha.verify, utils.asyn.route(user.register));
  app.put(config.api.user.updateUsername, utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.updateUsername));
  app.put(config.api.user.updatePassword, utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.updatePassword));
  app.delete(config.api.user.unregister, utils.asyn.route(utils.jwt.secured), utils.asyn.route(user.unregister));

  // client
  app.get("/", client.home);
  app.get("*", client.home);
};
