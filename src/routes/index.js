const user = require("./user");
const ticket = require("./ticket");
const user_profile = require("./user_profile");
const job_profile = require("./job_profile");
const file = require("./file");
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
  app.post(config.api.user.register, utils.asyn.route(mw.recaptcha.verify), utils.asyn.route(user.register));
  app.put(config.api.user.updateEmail, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user.updateEmail));
  app.put(config.api.user.updatePassword, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user.updatePassword));
  app.delete(config.api.user.unregister, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user.unregister));

  // admin
  app.post(
    config.api.admin.login,
    utils.asyn.route(mw.jwt.secured),
    utils.asyn.route(mw.ticket.admin),
    utils.asyn.route(admin.login)
  );
  app.get(
    config.api.admin.validate,
    utils.asyn.route(mw.jwt.secured),
    utils.asyn.route(mw.ticket.admin),
    utils.asyn.route(admin.validate)
  );

  // user_profile
  app.get(`${config.api.user_profile.read}/:url_title`, utils.asyn.route(user_profile.read));
  app.put(config.api.user_profile.update, utils.asyn.route(mw.jwt.secured), utils.asyn.route(user_profile.update));
  app.get(`${config.api.user_profile.search}/:index/:offset/:search_query`, utils.asyn.route(user_profile.search));

  // job_profile
  app.post(config.api.job_profile.create, utils.asyn.route(mw.jwt.secured), utils.asyn.route(job_profile.create));
  app.get(`${config.api.job_profile.read}/:url_title`, utils.asyn.route(job_profile.read));
  app.get(
    config.api.job_profile.readByOwnerId,
    utils.asyn.route(mw.jwt.secured),
    utils.asyn.route(job_profile.readByOwnerId)
  );
  app.put(config.api.job_profile.update, utils.asyn.route(mw.jwt.secured), utils.asyn.route(job_profile.update));
  app.get(`${config.api.job_profile.search}/:index/:offset/:search_query`, utils.asyn.route(job_profile.search));

  // file
  app.post(config.api.file.uploadResume, utils.asyn.route(mw.jwt.secured), utils.asyn.route(file.uploadResume));
  app.get(`${config.api.file.readByParentId}/:parent_id`, utils.asyn.route(file.readByParentId));
  app.get(`${config.api.file.readByStorageName}/:storage_name`, utils.asyn.route(file.readByStorageName));
  app.delete(config.api.file.remove, utils.asyn.route(mw.jwt.secured), utils.asyn.route(file.remove));

  // client
  app.get("/", client.home);
  app.get("*", client.home);
};
