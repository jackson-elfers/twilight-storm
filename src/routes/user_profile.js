const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");
const config = require("../config");

module.exports.read = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.user_profile.read(req.params)).results));
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

module.exports.update = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body._id = req.user._id;
    await actions.user_profile.update(req.body);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(utils.api.error({ status: 400, detail: config.messages.serverError }));
  }
};

module.exports.search = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.user_profile.search(req.params)).results));
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
