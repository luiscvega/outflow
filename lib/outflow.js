var _assert = require("assert");

module.exports = function (args) {
  var attributes = args.attributes;
  var validations = args.validations;
  var success = args.success;
  var errors = {};

  return function (args, callback) {
    var result;

    var assert = function (value, message) {
      try {
        _assert(value);
      } catch (e) {
        if (errors[message[0]]) {
          errors[message[0]].push(message[1]);
        } else {
          errors[message[0]] = [message[1]];
        };
      }
    };

    var validate = function () {
      errors = {};
      validations(assert, args);
    };

    validate()
    if (Object.keys(errors).length === 0) {
      result = success(args);
    }

    return callback(errors, result);
  };
};
