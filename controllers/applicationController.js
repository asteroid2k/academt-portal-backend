const Application = require("../models/Application");
const Batch = require("../models/Batch");
const { CustomError, handleError } = require("../util/errors");

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json({ count: applications.length, applications });
  } catch (error) {
    // handle errors
    handleError(res, error, "Could not fetch applications");
  }
};
const getUserApplication = async (req, res) => {
  try {
    const { user } = req;
    const application = await Application.findOne({ user_id: user.id });
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json({ application });
  } catch (error) {
    // handle errors
    handleError(res, error, "Could not fetch application");
  }
};

const submitApplication = async (req, res) => {
  try {
    if (req.files) {
      console.log(req.files);
    }
    const { user } = req;
    const { id } = req.params;
    const batch = await Batch.findById(id);
    if (!batch) {
      throw new CustomError("Invalid Application");
    }

    const newApp = new Application(req.body);
    newApp.user_id = user.id;
    newApp.batch_id = batch.id;
    newApp.batch_slug = batch.slug;
    newApp.age =
      new Date().getFullYear() - new Date(req.body.dob).getFullYear();

    await newApp.validate();
    await newApp.save();
    batch.app_count++;
    await batch.save();

    //TODO Upload pdf and image

    res.status(201).json({
      message: "Application submitted",
      application_id: newApp.id,
      batch: batch.id,
    });
  } catch (error) {
    console.log(error);
    handleError(res, error, "Application failed");
  }
};

module.exports = { submitApplication, getApplications, getUserApplication };
