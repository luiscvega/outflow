# Outflow
Logic workflow with validations

## Description
Outflow is heavily inspired from @soveran's Scrivener. Outflow takes Scrivener's front end validation and takes it a step further with a simple callback where you can create your logic.

## Usage
```javascript
var outflow = require("outflow");

var createPerson = outflow({
  validations: function (assert, attributes) {
    assert(attributes.first_name.length > 0, ["first name", "not present"]);
    assert(attributes.last_name.length > 0, ["last name", "not present"]);
  },

  success: function (attributes, callback) {
    var person = // Insert to DB

    callback(null, person)
  }
});

// Success
createPerson({
  first_name: "John",
  last_name: "Doe"
}, function (err, result) {
  console.log(err); // null
  console.log(result); // "Created!"
});

// Fail
createPerson({
  first_name: "",
  last_name: "Doe"
}, function (err, result) {
  console.log(err); // { "first name": ["not present"] }
});
```
