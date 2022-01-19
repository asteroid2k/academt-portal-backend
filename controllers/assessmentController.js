const Assessment = require("../models/Assessment");
const Batch = require("../models/Batch");
const { CustomError, handleError } = require("../util/errors");

// get all assessments
const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({}, "-questions -answers");
    res.status(200).json({ assessments });
  } catch (error) {
    handleError(res, error, "Could not fetch assessments");
  }
};
// get specific assessments
const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id, "-answers");
    if (!assessment) {
      throw new CustomError("Not found", 404);
    }
    res.status(200).json({ assessment });
  } catch (error) {
    handleError(res, error, "Could not fetch assessments");
  }
};
// create assessment
const createAssessment = async (req, res) => {
  try {
    const { name, batch_slug, questions, answers } = req.body;

    const batch = await Batch.findOne({ slug: batch_slug });
    if (!batch) {
      throw new CustomError("Could not find associated batch/application");
    }
    if (await Assessment.exists({ batch_id: batch.id })) {
      throw new CustomError("Assessment for this batch already exists");
    }

    const newAssessment = new Assessment({
      name,
      batch_id: batch.id,
      questions,
      answers,
    });
    await newAssessment.validate();
    newAssessment.save();
    res
      .status(201)
      .json({
        message: "Assessment created",
        assessment_id: newAssessment.id,
        batch: `${batch.name}[${batch.slug}]`,
      });
  } catch (error) {
    handleError(res, error, "Could not create assessment");
  }
};

module.exports = { getAssessments, createAssessment, getAssessment };
