const { Router } = require("express");
const {
  getAssessments,
  createAssessment,
  getAssessment,
} = require("../controllers/assessmentController");
const { validateData } = require("../middleware/validation");
const { assessmentValidator, idValidator } = require("../util/validators");

const assessRouter = Router();

assessRouter.get("/", getAssessments);
assessRouter.get("/:id", validateData(idValidator), getAssessment);
assessRouter.post("/", validateData(assessmentValidator), createAssessment);

module.exports = assessRouter;
