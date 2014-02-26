var outflow = require("../lib/outflow");
var assert = require("assert");

var createPerson = outflow({
  validations: function (assert, attributes) {
    assert(attributes.first_name.length > 0, "First name cannot be blank");
    assert(attributes.last_name.length > 0, "Last name cannot be blank");
  },

  success: function (attributes, callback) {
    callback(null, attributes);
  }
});

it("should run", function () {
  createPerson({
    first_name: "John",
    last_name: "Doe"
  }, function (err, result) {
    assert(err === null);
    assert.deepEqual(result, { first_name: "John", last_name: "Doe" });
  });
});

it("should validate", function () {
  createPerson({
    first_name: "",
    last_name: ""
  }, function (err, result) {
    assert.deepEqual(
      err.sort(),
      ["First name cannot be blank", "Last name cannot be blank"]);
  });
});
