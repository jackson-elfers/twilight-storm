const User = require("./user.controller.error");

const utils = require("../../utils");
const config = require("../../config");
const check = require("check-types");
const emailValidator = require("email-validator");

const method = {
  check: check,
  utils: utils,
  config: config,
  emailValidator: emailValidator
};

module.exports.user = new User({ method: method });
