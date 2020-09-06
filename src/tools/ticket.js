const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const utils = require("../utils");
const services = require("../services");

utils.db.connect();

async function main() {
  await services.ticket.create({ owner_id: process.argv[2], role: process.argv[3], expires_at: process.argv[4] });
  console.log("Ticket created successfully!");
}

main().catch(e => {
  console.log(e);
});
