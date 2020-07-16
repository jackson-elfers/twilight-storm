const socketio = require("socket.io");
const redis = require("socket.io-redis");
const check = require("check-types");
const config = require("../config");
const utils = require("../utils");

module.exports = function(server) {
  const io = socketio(server);

  if (process.env.REDIS === "true") {
    io.adapter(redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }));
  }

  io.on("connection", socket => {});
};
