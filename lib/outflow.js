var _assert = require("assert");

module.exports = function (args) {
  var attributes = args.attributes;
  var validations = args.validations;
  var success = args.success;

  return function (args, callback) {
    var errors;

    var assert = function (value, message) {
      try {
        _assert(value);
      } catch (e) {
        errors = errors || {};

        if (errors[message[0]]) {
          errors[message[0]].push(message[1]);
        } else {
          errors[message[0]] = [message[1]];
        };
      }
    };

    var result = function () {
    }

    validations(assert, args);

    if (errors) {
      callback(errors, args);
    } else {
      success(args, callback);
    };
  };
};
