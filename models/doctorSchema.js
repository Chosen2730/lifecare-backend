const { Schema, model } = require("mongoose");
const DoctorSchema = new Schema({
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

  sex: {
    type: String,
    enum: ["male", "female"],
  },
  consultFee: String,
  specialization: {
    type: String,
    enum: [
      "pediatricians",
      "psychiatrists",
      "ophthalmologists",
      "obstetrician/gynecologists",
      "neurologists",
    ],
  },
});

module.exports = model("Doctor", DoctorSchema);
