const Jwt = require("./jwt.mw");
const Recaptcha = require("./recaptcha.mw");

const utils = require("../utils");
const services = require("../services");
const check = require("check-types");
const axios = require("axios");

const method = {
  services: services,
  utils: utils,
  check: check,
  axios: axios
};

const jwt = new Jwt({ method: method });

const recaptcha = new Recaptcha({ method: method });

module.exports.jwt = { secured: jwt.secured.bind(jwt) };

module.exports.recaptcha = { verify: recaptcha.verify.bind(recaptcha) };
