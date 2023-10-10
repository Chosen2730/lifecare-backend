const { Schema, model } = require("mongoose");
const DoctorSchema = new Schema({});

module.exports = model("Doctor", DoctorSchema);
