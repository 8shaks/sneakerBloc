const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateListingInput(data) {
  let errors = {};

  data.price = !isEmpty(data.price) ? data.price : "";
  data.shoename = !isEmpty(data.shoename) ? data.shoename : "";
  data.size = !isEmpty(data.size) ? data.size : "";

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price is required";
  }

  if (Validator.isEmpty(data.shoename)) {
    errors.shoename = "Shoename is required";
  }

  if (Validator.isEmpty(data.size)) {
    errors.size = "Size is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
