module.exports = function (args) {
  var attributes = args.attributes;
  var validations = args.validations;
  var success = args.success;

  return function (args, callback) {
    var errors;

    // Simple validation function
    function assert(value, message) {
      if (!value) {
        errors = errors || [];
        errors.push(message);
      };
    };

    // Run validations if any
    if (validations) {
      validations(assert, args);
    };

    // Run callback if any errors
    if (errors) {
      callback(errors, args);
    } else {
      success(args, callback);
    };
  };
};
