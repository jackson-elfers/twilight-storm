const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");
const config = require("../config");

module.exports.create = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    req.body.owner_id = req.user._id;
    const response = await actions.job_profile.create(req.body);
    res.json(utils.api.send({ _id: response.info._id, url_title: response.info.url_title }));
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

module.exports.read = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.job_profile.read(req.params)).results));
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

module.exports.readByOwnerId = async function(req, res) {
  try {
    req.body.owner_id = req.user._id;
    res.json(utils.api.send((await actions.job_profile.readByOwnerId(req.body)).results));
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
    req.body.owner_id = req.user._id;
    const response = await actions.job_profile.update(req.body);
    res.json(utils.api.send({ url_title: response.info.url_title }));
  } catch (e) {
    console.log(e);
    res.json(utils.api.error({ status: 400, detail: config.messages.serverError }));
  }
};

module.exports.search = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    res.json(utils.api.send((await actions.job_profile.search(req.params)).results));
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

module.exports.remove = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    req.params.owner_id = req.user._id;
    await actions.job_profile.remove(req.params);
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
