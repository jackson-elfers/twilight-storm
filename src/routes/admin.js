const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");
const config = require("../config");

module.exports.login = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    res.cookie("Authorization", (await actions.admin.login(req.body)).jwt, {
      httpOnly: true,
      maxAge: Number(process.env.JWT_EXPIRATION) * 1000
    });
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: config.messages.user.login
      })
    );
  }
};

module.exports.validate = async function(req, res) {
  try {
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 500,
        detail: config.messages.serverError
      })
    );
  }
};
