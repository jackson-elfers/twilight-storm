const User = require("./user.service");
const Issue = require("./issue.service");
const Silence = require("./silence.service");
const Report = require("./report.service");
const Comment = require("./comment.service");
const Category = require("./category.service");
const Notify = require("./notify.service");

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

module.exports.issue = new Issue({ method: method });

module.exports.silence = new Silence({ method: method });

module.exports.report = new Report({ method: method });

module.exports.comment = new Comment({ method: method });

module.exports.category = new Category({ method: method });

module.exports.notify = new Notify({ method: method });
