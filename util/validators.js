const { body, param } = require("express-validator");

// format error info in a single sentence
const errorFormatter = ({ msg }) => {
  return `${msg}`;
};

// validator for registering user
const registerValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("Firstname is required")
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Firstname is too short"),
  body("lastName")
    .notEmpty()
    .withMessage("LastName is required")
    .bail()
    .trim()
    .isLength({ min: 2 })
    .withMessage("LastName is too short"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .bail()
    .trim()
    .isLength({ min: 9 })
    .withMessage("Phone is too short")
    .isMobilePhone("any"),
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
  registerValidator,
  loginValidator,
  idValidator,
  createBatchValidator,
};
