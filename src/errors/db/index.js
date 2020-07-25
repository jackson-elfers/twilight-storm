const User = require("./user.db.error");
const UserProfile = require("./user_profile.db.error");
const JobProfile = require("./job_profile.db.error");
const Ticket = require("./ticket.db.error");
const File = require("./file.db.error");

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
