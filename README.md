# Outflow
## Logic workflow with validations

Outflow is heavily inspired from @soveran's Scrivener. Outflow takes Scrivener's front end validation and takes it a step further with a simple callback where you can create your logic.

Example:
```
var outflow = require("outflow");

var createPerson = outflow({
  attributes: ["first_name", "last_name"],

  validations: function (assert, attributes) {
    assert(attributes.first_name.length > 0, ["first name", "not present"]);
    assert(attributes.last_name.length > 0, ["last name", "not present"]);
  },

  success: function (attributes) {
    // Insert to DB

    return "Created!";
  }
});

// Success
createPerson({
  first_name: "John",
  last_name: "Doe"
}, function (err, result) {
  console.log(err); // Empty object: {}
  console.log(result); // "Created!"
});

// Fail
createPerson({
  first_name: "",
  last_name: ""
}, function (err, result) {
  console.log(err); // { "first name": ["not present"], "last name": ["not present"] }
});
```
