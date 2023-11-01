const { StatusCodes } = require("http-status-codes");
const Appointment = require("../models/appointmentSchema");
const Doctor = require("../models/doctorSchema");
const Patient = require("../models/patientModel");
const { BadRequestError, NotFoundError } = require("../errors");

const getDashDetails = async (req, res) => {
  const appointments = await Appointment.find();
  const doctor = await Doctor.find();
  const patient = await Patient.find();
  res.status(StatusCodes.OK).json({
    patient: patient.length,
    doctor: doctor.length,
    appointment: appointments.length,
  });
};

const getAllAppointments = async (req, res) => {
  const appointments = await Appointment.find()
    .sort({ createdAd: -1 })
    .populate("doctor")
    .populate("patient");
  if (appointments.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No appointment found" });
    return;
  }
  res.status(StatusCodes.OK).json({ appointments, count: appointments.length });
};

const getDoctorsAppointments = async (req, res) => {
  const doctor = req.params.id;
  const appointments = await Appointment.find({ doctor }).sort({
    createdAd: -1,
  });
  if (appointments.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No appointment found" });
    return;
  }
  res.status(StatusCodes.OK).json({ appointments, count: appointments.length });
};

const getPatientsAppointments = async (req, res) => {
  const appointments = await Appointment.find({ patient: req.user.email })
    .sort({ createdAd: -1 })
    .populate("doctor");
  if (appointments.length < 1) {
    res.status(StatusCodes.OK).json({ msg: "No appointment found" });
    return;
  }
  res.status(StatusCodes.OK).json({ appointments, count: appointments.length });
};

const createAppointment = async (req, res) => {
  const { doctor, date, time } = req.body;
  if (!doctor || !date || !time) {
    throw new BadRequestError("Please provide a valid date, time and a Doctor");
  }

  const isDoctorValid = await Doctor.findOne({ _id: doctor });
  if (!isDoctorValid) {
    throw new NotFoundError("Doctor not found");
  }

  const appointment = await Appointment.create({
    ...req.body,
    patient: req.user.email,
  });
  res.status(StatusCodes.CREATED).json({ appointment });
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true, runValidators: true }
  );
  if (!appointment) {
    throw new NotFoundError("Appointment not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Update successful", appointment });
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const appointment = await Appointment.findOneAndDelete({ _id: id });
  if (!appointment) {
    throw new NotFoundError("Appointment not found");
  }
  res.status(StatusCodes.OK).json({ msg: "Delete successful" });
};

module.exports = {
  getAllAppointments,
  getAllAppointments,
  updateAppointment,
  createAppointment,
  getPatientsAppointments,
  getDoctorsAppointments,
  deleteAppointment,
  getDashDetails,
};
