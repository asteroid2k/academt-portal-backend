const Assessment = require("../models/Assessment");
const Batch = require("../models/Batch");
const { CustomError, handleError } = require("../util/errors");

// get all assessments
const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({}, "-questions");
    res.status(200).json({ assessments });
  } catch (error) {
    handleError(res, error, "Could not fetch assessments");
  }
};
// get specific assessments
const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);
    res.status(200).json({ assessment });
  } catch (error) {
    handleError(res, error, "Could not fetch assessments");
  }
};
// create assessment
const createAssessment = async (req, res) => {
  try {
    const { name, batch_slug, questions } = req.body;

    const batch = await Batch.findOne({ slug: batch_slug });
    if (!batch) {
      throw new CustomError("Could not find associated batch");
    }
    if (await Assessment.exists({ batch_id: batch.id })) {
      throw new CustomError("Assessment for this batch already exists");
    }

    const newAssessment = new Assessment({
      name,
      batch_id: batch.id,
      questions,
    });
    await newAssessment.validate();
    newAssessment.save();
    res
      .status(201)
      .json({ message: "Assessment created", assessment_id: newAssessment.id });
  } catch (error) {
    handleError(res, error, "Could not create assessment");
  }
};

module.exports = { getAssessments, createAssessment, getAssessment };
