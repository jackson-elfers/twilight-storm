const checktypes = require("./checktypes");
const check = require("check-types");

describe("src/utils/checktypes.js", () => {
  it("checks params against template", () => {
    const template = { one: "object", two: "array", three: "boolean" };
    const params = { one: {}, two: [], three: false };
    checktypes({ template: template, params: params });
  });

  it("throws error upon missing property", () => {
    const template = { one: "object", two: "array", three: "boolean" };
    const params = { one: {}, three: false };
    try {
      checktypes({ template: template, params: params });
    } catch (e) {
      return;
    }
    throw new Error("missing property wasn't caught successfully");
  });

  it("throws error upon checking wrong type", () => {
    const template = { one: "string", two: "array", three: "boolean" };
    const params = { one: {}, two: [], three: false };
    try {
      checktypes({ template: template, params: params });
    } catch (e) {
      return;
    }
    throw new Error("wrong type wasn't caught successfully");
  });
});
