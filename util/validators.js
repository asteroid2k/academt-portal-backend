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
    .optional()
    .trim()
    .isLength({ min: 4 })
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
    .withMessage("CLosure date is required")
    .bail()
    .trim()
    .isISO8601({ strict: true })
    .withMessage("Closure date must be in ISO format"),
  body("instructions")
    .notEmpty()
    .withMessage("Provide instructions for application"),
];

//assessment validator
const assessmentValidator = [
  body("name").optional(),
  body("batch_id").notEmpty().withMessage("Batch id is required"),
  body("questions").isArray({ min: 1 }).withMessage("Invalid questions type"),
  body("answers").isArray({ min: 1 }).withMessage("Invalid answers type"),
];

const submitApplicationValidator = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 }),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 }),
  body("email").notEmpty().withMessage("Email is required").isEmail(),
  body("dob").notEmpty().withMessage("Birth date is required").isISO8601(),
  body("course").notEmpty().withMessage("Course is required"),
  body("address").notEmpty().withMessage("Address is required"),
  body("university").notEmpty().withMessage("University is required"),
  body("gpa").notEmpty().withMessage("GPA is required").isDecimal(),
];

const quizValidator = [
  ...idValidator,
  body("answers").isArray({ min: 1 }).withMessage("Answers required"),
];

module.exports = {
  errorFormatter,
  registerValidator,
  loginValidator,
  idValidator,
  createBatchValidator,
  assessmentValidator,
  submitApplicationValidator,
  quizValidator,
};
