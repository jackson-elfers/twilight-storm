const actions = require("../controllers");
const utils = require("../utils");
const check = require("check-types");

module.exports.uploadResume = async function(req, res) {
  try {
    const file_meta = JSON.parse(req.headers.file_meta);
    const data = { body: req, parent_id: file_meta.parent_id, owner_id: req.user._id, file_name: file_meta.file_name };
    const response = await actions.file.uploadResume(data);
    res.json(utils.api.send({ storage_name: response.info.storage_name }));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readByParentId = async function(req, res) {
  try {
    check.assert(check.object(req.body), "expected object attached to req.body");
    res.json(utils.api.send((await actions.file.readByParentId(req.params)).results));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.readByStorageName = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    (await actions.file.readByStorageName(req.params)).pipe(res);
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};

module.exports.remove = async function(req, res) {
  try {
    check.assert(check.object(req.params), "expected object attached to req.params");
    req.params.owner_id = req.user._id;
    await actions.file.remove(req.params);
    res.json(utils.api.send(null));
  } catch (e) {
    console.log(e);
    res.json(
      utils.api.error({
        status: 400,
        detail: "invalid or malformed parameters"
      })
    );
  }
};
