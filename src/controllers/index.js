const User = require("./user.controller");

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
