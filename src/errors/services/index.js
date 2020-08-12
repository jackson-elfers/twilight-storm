const User = require("./user.service.error");
const UserProfile = require("./user_profile.service.error");
const JobProfile = require("./job_profile.service.error");
const Ticket = require("./ticket.service.error");
const File = require("./file.service.error");
const Admin = require("./admin.service.error");

const utils = require("../../utils");
const config = require("../../config");
const check = require("check-types");
const emailValidator = require("email-validator");
const mime = require("mime-types");

const method = {
  check: check,
  utils: utils,
  config: config,
  emailValidator: emailValidator,
  mime: mime
};

module.exports.user = new User({ method: method });

module.exports.user_profile = new UserProfile({ method: method });

module.exports.job_profile = new JobProfile({ method: method });

module.exports.ticket = new Ticket({ method: method });

module.exports.file = new File({ method: method });

module.exports.admin = new Admin({ method: method });
