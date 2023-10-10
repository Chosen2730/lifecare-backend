const { StatusCodes } = require("http-status-codes");
const Patient = require("../models/patientModel");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllPatients = async (req, res) => {
  const patients = await Patient.find().sort({ createdAd: -1 });
  if (patients.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No patient found" });
    return;
  }
  res.status(StatusCodes.OK).json({ patients, count: patients.length });
};

const createPatient = async (req, res) => {
  const { email } = req.user;
  const isPatient = await Patient.findOne({ email });
  if (isPatient) {
    throw new BadRequestError("Profile already created");
  }
  const patient = await Patient.create({
    email,
    ...req.body,
  });
  res.status(StatusCodes.CREATED).json({ patient });
};

const getPatient = async (req, res) => {
  const patient = await Patient.findOne({ email: req.user.email });
  if (!patient) {
    return res.status(StatusCodes.OK).json({ created: false });
  }
  res.status(StatusCodes.OK).json({ patient });
};

const updatePatient = async (req, res) => {
  const patient = await Patient.findOneAndUpdate(
    { email: req.user.email },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!patient) {
    throw new NotFoundError("User not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Update successful", patient });
};

const searchPatient = async (req, res) => {
  const patient = await Patient.aggregate([
    {
      $search: {
        index: "default",
        text: {
          query: req.params.key,
          path: {
            wildcard: "*",
          },
        },
      },
    },
  ]);
  if (!patient || patient.length < 1) {
    return res.status(StatusCodes.OK).json({ mag: "Record not found" });
  }
  res.status(StatusCodes.OK).json({ patient });
};

module.exports = {
  createPatient,
  getPatient,
  updatePatient,
  getAllPatients,
  searchPatient,
};
