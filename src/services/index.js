const User = require("./user.service");

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
