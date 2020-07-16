const check = require("check-types");

module.exports = function(data) {
  check.assert(check.object(data), "expected object as first argument.");
  check.assert(check.object(data.template), "expected data.template to be of type object.");
  check.assert(check.object(data.params), "expected data.params to be of type object.");
  const templateKeys = Object.keys(data.template);
  for (var i = 0; i < templateKeys.length; ++i) {
    check.assert(data.params.hasOwnProperty(templateKeys[i]), `parameter missing: ${templateKeys[i]}`);
    const type = data.template[templateKeys[i]];
    check.assert(check[type](data.params[templateKeys[i]]), `expected ${templateKeys[i]} to be of type ${type}`);
  }
};
