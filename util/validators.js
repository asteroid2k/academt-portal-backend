const { body, param } = require("express-validator");

// format error info in a single sentence
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

// validator for login
const loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .trim()
    .isEmail()
    .withMessage("Provide a valid email")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8 })
    .withMessage("Enter password with at least 8 characters"),
];

// validator for object id
const idValidator = [
  param("id")
    .notEmpty()
    .withMessage("Id required")
    .trim()
    .isAlphanumeric()
    .withMessage("Invalid Id")
    .isLength({ min: 24, max: 24 })
    .withMessage("Invalid Id length"),
];

const createBatchValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .trim()
    .isLength({ min: 6 })
    .withMessage("Name is too short"),
  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .bail()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Slug is too short"),
  body("closure_date")
    .notEmpty()
    .withMessage("Slug is required")
    .bail()
    .trim()
    .isDate()
    .withMessage("Closure date must be a valid date"),
  body("closure_date")
    .notEmpty()
    .withMessage("Slug is required")
    .bail()
    .trim()
    .isISO8601({ strict: true })
    .toDate()
    .withMessage("Closure date must be a valid date"),
  body("instructions").notEmpty().withMessage("Provide instructions"),
];

module.exports = {
  errorFormatter,
  loginValidator,
  idValidator,
  createBatchValidator,
};
