module.exports = function (args) {
  var validations = args.validations;
  var success = args.success;

  return function (attributes, callback) {
    var errors;

    // Simple assertion function
    function assert(value, message) {
      if (!value) {
        errors = errors || [];
        errors.push(message);
      };
    };

    // Run validations if any
    if (validations) {
      validations(assert, attributes);
    };

    // Run callback if any errors
    if (errors) {
      callback(errors, attributes);
    } else {
      success(attributes, callback);
    };
  };
};
