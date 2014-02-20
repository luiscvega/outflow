var outflow = require("../lib/outflow");
var assert = require("assert");

var createPerson = outflow({
  attributes: ["first_name", "last_name"],

  validations: function (assert, attributes) {
    assert(attributes.first_name.length > 0, ["first name", "not present"]);
    assert(attributes.last_name.length > 0, ["last name", "not present"]);
  },

  success: function (attributes) {
    return attributes;
  }
});

it("should run", function () {
  createPerson({
    first_name: "John",
    last_name: "Doe"
  }, function (err, result) {
    assert.equal(err, undefined);
    assert.deepEqual(result, { first_name: "John", last_name: "Doe" });
  });
});

it("should validate", function () {
  createPerson({
    first_name: "",
    last_name: ""
  }, function (err, result) {
    assert.deepEqual(err, { "first name": ["not present"], "last name": ["not present"] });
  });
});
