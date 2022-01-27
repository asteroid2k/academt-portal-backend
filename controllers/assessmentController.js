const Assessment = require("../models/Assessment");
const Batch = require("../models/Batch");
const { CustomError, handleError } = require("../util/errors");
const Result = require("../models/Result");

// get all assessments
const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({}, "-questions -answers");
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
    const { name, batch_id, questions, answers } = req.body;

    const batch = await Batch.findById(batch_id);
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
    res.status(201).json({
      message: `Assessment created for ${batch.slug}`,
      assessment_id: newAssessment.id,
      batch: batch.id,
    });
  } catch (error) {
    handleError(res, error, "Could not create assessment");
  }
};

// take assessment
const takeAssessment = async (req, res) => {
  try {
    const { user } = req;

    const assessment = await Assessment.findOne({
      batch_id: req.params.id,
    });
    if (!assessment) {
      throw new CustomError("Assessment not found", 404);
    }

    const answers = req.body.answers;
    const correctAnswers = assessment.answers;
    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      let answer = answers[i];
      const Cans = correctAnswers.find(function (ans) {
        return ans.num === answer.num;
      });

      if (Cans.value === answer.value) score++;
    }
    console.log("Score", score);
    const result = new Result({
      answers,
      score,
      user_id: user.id,
      batch_id: req.params.id,
    });
    await result.validate();
    await result.save();
    res.status(200).json({ message: "Assessment submitted" });
  } catch (error) {
    console.log(error);
    handleError(res, error, "Could not submit assessment");
  }
};

module.exports = {
  getAssessments,
  createAssessment,
  getAssessment,
  takeAssessment,
};
