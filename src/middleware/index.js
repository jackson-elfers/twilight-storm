const Jwt = require("./jwt.mw");
const Recaptcha = require("./recaptcha.mw");

const utils = require("../utils");
const check = require("check-types");
const axios = require("axios");

const method = {
  utils: utils,
  check: check,
  axios: axios
};

const jwt = new Jwt({ method: method });

const recaptcha = new Recaptcha({ method: method });

module.exports.jwt = { secured: jwt.secured.bind(jwt) };

module.exports.recaptcha = { verify: recaptcha.verify.bind(recaptcha) };
