const { StatusCodes } = require("http-status-codes");
const Doctor = require("../models/doctorSchema");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllDoctors = async (req, res) => {
  const doctors = await Doctor.find().sort({ createdAd: -1 });
  if (doctors.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No Doctor found" });
    return;
  }
  res.status(StatusCodes.OK).json({ doctors, count: doctors.length });
};
const getDoctors = async (req, res) => {
  const { specialization } = req.query;
  const doctors = await Doctor.find({ specialization }).sort({ createdAd: -1 });
  if (doctors.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No Doctor found" });
    return;
  }
  res.status(StatusCodes.OK).json({ doctors, count: doctors.length });
};

const getSpecializations = async (req, res) => {
  const colors = Doctor.schema.path("specialization").enumValues;
  res.status(StatusCodes.OK).json(colors);
};

const createDoctor = async (req, res) => {
  const { email } = req.user;
  const isDoctor = await Doctor.findOne({ email });
  if (isDoctor) {
    throw new BadRequestError("Profile already created");
  }
  const doctor = await Doctor.create({
    email,
    ...req.body,
  });
  res.status(StatusCodes.CREATED).json({ doctor });
};

const getDoctor = async (req, res) => {
  const doctor = await Doctor.findOne({ email: req.user.email });
  if (!doctor) {
    return res.status(StatusCodes.OK).json({ created: false });
  }
  res.status(StatusCodes.OK).json({ doctor });
};

const updateDoctor = async (req, res) => {
  const doctor = await Doctor.findOneAndUpdate(
    { email: req.user.email },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!doctor) {
    throw new NotFoundError("Doctor not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Update successful", doctor });
};

module.exports = {
  createDoctor,
  getDoctor,
  updateDoctor,
  getAllDoctors,
  getSpecializations,
  getDoctors,
};
