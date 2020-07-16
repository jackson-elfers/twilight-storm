const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");
const config = require("../config");

module.exports.login = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    res.cookie("Authorization", (await actions.user.login(req.body)).jwt, {
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

module.exports.logout = function(req, res) {
  try {
    res.clearCookie("Authorization");
    res.json(utils.api.send(utils.api.send(null)));
  } catch (e) {
    res.json(utils.api.error({ status: 500, detail: config.messages.serverError }));
  }
};

module.exports.readSingleId = async function(req, res) {
  try {
    res.json(utils.api.send((await actions.user.readSingleId(req.params)).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: config.messages.serverError
      })
    );
  }
};

module.exports.usernameExists = async function(req, res) {
  try {
    res.json(utils.api.send((await actions.user.usernameExists(req.params)).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: config.messages.serverError
      })
    );
  }
};

module.exports.info = async function(req, res) {
  try {
    res.json(utils.api.send(req.user));
  } catch (e) {
    console.log(e);
    res.json(utils.api.error({ status: 500, detail: config.messages.serverError }));
  }
};

module.exports.register = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    await actions.user.register(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: config.messages.serverError
      })
    );
  }
};

module.exports.updateUsername = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body._id = req.user._id;
    await actions.user.updateUsername(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(utils.api.error({ status: 400, detail: config.messages.serverError }));
  }
};

module.exports.updatePassword = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body._id = req.user._id;
    await actions.user.updatePassword(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(utils.api.error({ status: 400, detail: config.messages.serverError }));
  }
};

module.exports.unregister = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body._id = req.user._id;
    await actions.user.unregister(req.body);
    res.clearCookie("Authorization");
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
