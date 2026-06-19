const Application = require("../models/Application");
const createApplication = async (req, res) => {
  try {
    const application =
      await Application.create({
        userId: req.body.userId,
        company: req.body.company,
        role: req.body.role,
        platform: req.body.platform,
        appliedDate: req.body.appliedDate,
        status: req.body.status,
      });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getApplications = async (req, res) => {
  try {
    const applications =
      await Application.find({
        userId: req.params.userId,
      });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const updateApplication = async (req, res) => {
  try {
    const application =
      await Application.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(application);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication,
};