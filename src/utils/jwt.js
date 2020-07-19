const jwt = require("jsonwebtoken");
const check = require("check-types");

function generate(data) {
  return new Promise((resolve, reject) => {
    jwt.sign(data, process.env.JWT_SECRET, { expiresIn: Number(process.env.JWT_EXPIRATION) }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

function decode(data) {
  return new Promise((resolve, reject) => {
    jwt.verify(data, process.env.JWT_SECRET, function(error, decoded) {
      if (error) {
        reject(error);
      } else if (check.object(decoded)) {
        resolve(decoded);
      } else {
        reject(new Error("jwt could not be verified or decoded"));
      }
    });
  });
}

module.exports.generate = generate;

module.exports.decode = decode;

// verify/decode token/payload
module.exports.verify = async function(data) {
  check.assert(check.string(data), "expected string as first argument");
  return await decode(data);
};

// generate token
module.exports.sign = async function(data) {
  check.assert(check.object(data), "expected object as first argument");
  return await generate(data);
};
