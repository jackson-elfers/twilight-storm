const User = require("./user.service");
const UserProfile = require("./user_profile.service");
const JobProfile = require("./job_profile.service");
const Ticket = require("./ticket.service");
const File = require("./file.service");
const Admin = require("./admin.service");

const errors = require("../errors/services");
const db = require("../db");
const utils = require("../utils");
const config = require("../config");
const check = require("check-types");
const AWS = require("aws-sdk");
const mime = require("mime-types");
const request = require("request");

const method = {
  db: db,
  check: check,
  utils: utils,
  config: config,
  request: request,
  AWS: AWS,
  mime: mime,
  errors: errors
};

module.exports.user = new User({ method: method });

module.exports.user_profile = new UserProfile({ method: method });

module.exports.job_profile = new JobProfile({ method: method });

module.exports.ticket = new Ticket({ method: method });

module.exports.file = new File({ method: method });

module.exports.admin = new Admin({ method: method });
