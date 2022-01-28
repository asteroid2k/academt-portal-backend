const Application = require("../models/Application");
const Batch = require("../models/Batch");
const User = require("../models/User");
const { CustomError, handleError } = require("../util/errors");
const { uploadFile } = require("../util/helpers");

const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    const batches = await Batch.find()
      .select("slug -_id")
      .sort({ slug: "asc" });
    res.status(200).json({ count: applications.length, applications, batches });
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
    const { user } = req;
    const { id } = req.params;
    const batch = await Batch.findById(id);
    if (!batch) {
      throw new CustomError("Invalid Application");
    }
    if (await Application.findOne({ user_id: user.id, batch_id: id })) {
      throw new CustomError("You have an existing application");
    }

    const newApp = new Application(req.body);
    newApp.user_id = user.id;
    newApp.batch_id = batch.id;
    newApp.batch_slug = batch.slug;
    newApp.age =
      new Date().getFullYear() - new Date(req.body.dob).getFullYear();

    batch.app_count++;
    await batch.save();

    if (req.files) {
      const { image, cv } = req.files;
      if (image && cv) {
        if (image[0].size > 500000 || cv[0].size > 500000) {
          throw new CustomError("File too large");
        }
        newApp.cv = await uploadFile(cv[0]);
        newApp.image = await uploadFile(image[0]);
      }
    }

    await newApp.validate();
    await newApp.save();

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

const updateApplicationStatus = async (req, res) => {
  const { status, id } = req.body;

  try {
    const application = await Application.findById(id);
    if (!application) {
      throw new CustomError("Application not found", 404);
    }
    application.isApproved = status;
    await application.save();

    res.status(200).json({ message: `Application updated (${status})` });
  } catch (error) {
    handleError(res, error, "Application update failed");
  }
};

module.exports = {
  submitApplication,
  getApplications,
  getUserApplication,
  updateApplicationStatus,
};
