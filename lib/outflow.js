var _assert = require("assert");

module.exports = function (args) {
  var attributes = args.attributes;
  var validations = args.validations;
  var success = args.success;

  return function (args, callback) {
    var result;
    var errors;

    var assert = function (value, message) {
      try {
        _assert(value);
      } catch (e) {
        errors = errors || {}

        if (errors[message[0]]) {
          errors[message[0]].push(message[1]);
        } else {
          errors[message[0]] = [message[1]];
        };
      }
    };

    var validate = function () {
      delete errors
      validations(assert, args);
    };

    validate()
    if (!errors) {
      result = success(args);
    }

    return callback(errors, result);
  };
};
