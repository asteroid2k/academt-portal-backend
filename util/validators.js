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
  body("batch_id")
    .isLength({ min: 24, max: 24 })
    .notEmpty()
    .withMessage("Batch id is required"),
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
  body("application").notEmpty().isMongoId(),
];
const applicationStatusValidator = [
  body("id").isLength({ min: 24, max: 24 }).withMessage("Invalid id"),
  body("status")
    .toLowerCase()
    .custom((value) => {
      console.log(value);
      if (!["approved", "declined"].includes(value)) {
        return Promise.reject(
          "Invalid application status.['approved','declined']"
        );
      }
      return Promise.resolve();
    }),
];

const forgotPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Provide an email")
    .isEmail()
    .withMessage("Provide valid email"),
  // body("phone")
  //   .optional()
  //   .isMobilePhone("any")
  //   .isLength({ min: 9 })
  //   .withMessage("Provide valid phone number"),
];
const resetPasswordValidator = [
  body("code")
    .notEmpty()
    .withMessage("Provide reset code")
    .isLength({ min: 8, max: 8 })
    .withMessage("Provide valid code"),
  body("password")
    .notEmpty()
    .withMessage("Provide a new password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

const editProfileValidator = [
  body("firstName")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Firstname is too short"),
  body("lastName")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("LastName is too short"),
  body("country")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Country is too short"),
  body("address")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Address is too short"),
  body("phone")
    .optional()
    .trim()
    .isLength({ min: 9 })
    .withMessage("Phone is too short")
    .isMobilePhone("any"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Provide a valid email")
    .normalizeEmail(),
];

const editAssessmentValidator = [
  body("time")
    .notEmpty()
    .withMessage("Time is required")
    .isNumeric()
    .toInt()
    .custom((value) => {
      return value > 0;
    }),
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
  applicationStatusValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  editProfileValidator,
  editAssessmentValidator,
};
