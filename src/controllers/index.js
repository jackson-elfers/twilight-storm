const User = require("./user.controller");
const UserProfile = require("./user_profile.controller");
const JobProfile = require("./job_profile.controller");
const File = require("./file.controller");
const Admin = require("./admin.controller");

const errors = require("../errors/controllers");
const services = require("../services");
const check = require("check-types");
const mime = require("mime-types");
const axios = require("axios");
const config = require("../config");

const method = {
  errors: errors,
  services: services,
  check: check,
  mime: mime,
  axios: axios,
  config: config
};

module.exports.user = new User({ method: method });

module.exports.user_profile = new UserProfile({ method: method });

module.exports.job_profile = new JobProfile({ method: method });

module.exports.file = new File({ method: method });

module.exports.admin = new Admin({ method: method });
