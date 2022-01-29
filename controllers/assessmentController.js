const Assessment = require("../models/Assessment");
const Application = require("../models/Application");
const Batch = require("../models/Batch");
const { CustomError, handleError } = require("../util/errors");
const Result = require("../models/Result");

// get all assessments
const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find(
      {},
      "-questions -answers"
    ).populate("batch_id", "slug isClosed closure_date");
    assessments.forEach((assessment) => {
      if (assessment.batch_id.isClosed) {
        assessment.status = "taken";
        assessment.save();
      }
    });
    res.status(200).json({ assessments });
  } catch (error) {
    handleError(res, error, "Could not fetch assessments");
  }
};
// get specific assessment using batch id
const getAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findOne({
      batch_id: req.params.id,
    });
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
    const { batch_id, questions, answers } = req.body;

    const batch = await Batch.findById(batch_id);
    if (!batch) {
      throw new CustomError("Could not find associated batch/application");
    }
    if (await Assessment.exists({ batch_id: batch.id })) {
      throw new CustomError("Assessment for this batch already exists");
    }

    const newAssessment = new Assessment({
      slug: batch.slug,
      batch_id: batch.id,
      questions,
      answers,
    });

    await newAssessment.validate();
    newAssessment.save();

    res.status(201).json({
      message: `Assessment created for ${batch.slug}`,
      assessment_id: newAssessment.id,
      batch: batch.id,
    });
  } catch (error) {
    console.log(error);

    handleError(res, error, "Could not create assessment");
  }
};

// take assessment
const takeAssessment = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { answers, application } = req.body;

    const uApplication = await Application.findById(application);
    if (!uApplication) {
      throw new CustomError("Your application was not found");
    }
    if (uApplication.isApproved !== "approved") {
      throw new CustomError("Your application is not approved");
    }

    const assessment = await Assessment.findOne({
      batch_id: id,
    });
    if (!assessment) {
      throw new CustomError("Assessment not found", 404);
    }
    if (await Result.findOne({ user_id: user.id, batch_id: id })) {
      throw new CustomError("You have already taken this assessment");
    }

    const correctAnswers = assessment.answers;
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      const Cans = correctAnswers.find(function (ans) {
        return ans.num === answer.num;
      });

      if (Cans.value === answer.value) score++;
    }
    const result = new Result({
      answers,
      score,
      user_id: user.id,
      batch_id: req.params.id,
      application,
    });
    await result.validate();
    await result.save();

    user.updates.push({ text: `[${assessment.slug}]: Assessment completed` });
    await user.save();

    res.status(200).json({ message: "Assessment submitted" });
  } catch (error) {
    handleError(res, error, "Could not submit assessment");
  }
};

const updateTimer = async (req, res) => {
  try {
    const { time } = req.body;
    const assessment = await Assessment.findOne({ batch_id: req.params.id });
    if (!assessment) {
      throw new CustomError("Assessment not found", 404);
    }
    assessment.time_allocated = time;
    await assessment.save();
    res.status(200).json({ message: "Assessment time updated" });
  } catch (error) {
    handleError(res, error, "Could not update assessment");
  }
};

module.exports = {
  getAssessments,
  createAssessment,
  getAssessment,
  takeAssessment,
  updateTimer,
};
