const { Router } = require("express");
const {
  getAssessments,
  createAssessment,
  getAssessment,
  takeAssessment,
  updateTimer,
} = require("../controllers/assessmentController");
const { validateData } = require("../middleware/validation");
const {
  assessmentValidator,
  idValidator,
  quizValidator,
  editAssessmentValidator,
} = require("../util/validators");
const { verifyToken, verifyAdmin } = require("../middleware/auth");

const assessRouter = Router();
assessRouter.use(verifyToken);

assessRouter.get("/", getAssessments);
assessRouter.get("/:id", validateData(idValidator), getAssessment);
// take assessment
assessRouter.post("/:id", validateData(quizValidator), takeAssessment);

// create assessment
assessRouter.post(
  "/",
  validateData(assessmentValidator),
  verifyAdmin,
  createAssessment
);
// update assessment
assessRouter.patch(
  "/:id",
  validateData(editAssessmentValidator),
  verifyAdmin,
  updateTimer
);

module.exports = assessRouter;
