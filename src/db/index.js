const Models = require("./models.db");
const User = require("./user.db");

const errors = require("../errors/db");
const utils = require("../utils");
const uuid = require("uuid/v1");
const sqlstring = require("sqlstring");
const check = require("check-types");
const mime = require("mime-types");
const shortid = require("shortid");
var urlify = require("urlify").create({
  addEToUmlauts: true,
  szToSs: true,
  spaces: "-",
  nonPrintable: "_",
  trim: true
});

const method = {
  errors: errors,
  utils: utils,
  uuid: uuid,
  sqlstring: sqlstring,
  check: check,
  mime: mime,
  urlify: urlify,
  shortid: shortid
};

module.exports.models = new Models({ method: method });

module.exports.user = new User({ method: method });
