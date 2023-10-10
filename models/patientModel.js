const { Schema, model } = require("mongoose");
const PatientSchema = new Schema({
  firstName: String,
  lastName: String,
  surname: String,
  tel: String,

  email: {
    type: String,
    trim: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ["Please provide a valid email"],
    ],
  },

  address: String,
  age: String,
  state: String,
  maritalStatus: String,
  sex: {
    type: String,
    enum: ["male", "female"],
  },
  emergencyContact: String,
  bloodGroup: String,
  genotype: String,
});

module.exports = model("Patient", PatientSchema);
