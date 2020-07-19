const dotenv = require("dotenv").config();
const jwt = require("./jwt");
const assert = require("assert");
const check = require("check-types");

describe("src/utils/jwt.js", () => {
  describe("verify()", () => {
    it("verifies jwt and returns object", async () => {
      const payload = { _id: "52a3e6fe-b592-45a3-b6f1-e66b9791d83e" };
      const data = await jwt.sign(payload);
      const decoded = await jwt.verify(data);
      check.assert(decoded._id === payload._id);
    });

    it("throws error upon invalid verification", async () => {
      const payload = { _id: "52a3e6fe-b592-45a3-b6f1-e66b9791d83e" };
      const data = await jwt.sign(payload);
      var thrown = false;
      try {
        const decoded = await jwt.verify("invalid");
      } catch (e) {
        thrown = true;
      }
      check.assert(thrown);
    });
  });

  describe("sign()", () => {
    it("returns a jwt", async () => {
      const data = await jwt.sign({});
      assert(check.string(data));
      assert(data.length === 128);
    });
  });
});
