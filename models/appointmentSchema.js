const { model, Schema } = require("mongoose");
const AppointmentSchema = new Schema({
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  date: String,
  time: String,
  status: {
    type: String,
    enum: ["pending", "in progress", "completed", "unavailable", "cancelled"],
    default: "pending",
  },
  patient: String,
});

module.exports = model("Appointment", AppointmentSchema);
