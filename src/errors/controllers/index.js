const User = require("./user.controller.error");
const UserProfile = require("./user_profile.controller.error");
const JobProfile = require("./job_profile.controller.error");
const Ticket = require("./ticket.controller.error");
const File = require("./file.controller.error");
const Admin = require("./admin.controller.error");

const utils = require("../../utils");
const config = require("../../config");
const check = require("check-types");

const method = {
  check: check,
  utils: utils,
  config: config
};

module.exports.user = new User({ method: method });

module.exports.user_profile = new UserProfile({ method: method });

module.exports.job_profile = new JobProfile({ method: method });

module.exports.ticket = new Ticket({ method: method });

module.exports.file = new File({ method: method });

module.exports.admin = new Admin({ method: method });
