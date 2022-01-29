const { Router } = require("express");
const {
  getAssessments,
  createAssessment,
  getAssessment,
  takeAssessment,
} = require("../controllers/assessmentController");
const { validateData } = require("../middleware/validation");
const {
  assessmentValidator,
  idValidator,
  quizValidator,
} = require("../util/validators");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const assessRouter = Router();
assessRouter.use(verifyToken);

assessRouter.get("/", getAssessments);
assessRouter.get("/:id", validateData(idValidator), getAssessment);
assessRouter.post(
  "/",
  validateData(assessmentValidator),
  verifyAdmin,
  createAssessment
);
assessRouter.post("/:id", validateData(quizValidator), takeAssessment);

module.exports = assessRouter;
