const router = require("express").Router();
const {
  getAllAppointments,
  updateAppointment,
  createAppointment,
  getPatientsAppointments,
  getDoctorsAppointments,
} = require("../controllers/appointmentLogic");
const {
  authorize,
  authorizePermissions,
} = require("../middlewares/authorization");

router.post("/", authorize, createAppointment);
router.get("/", authorize, getPatientsAppointments);
router.get(
  "/all",
  authorize,
  authorizePermissions("admin"),
  getAllAppointments
);
router.patch("/:id", authorize, updateAppointment);
router.get(
  "/:id",
  authorize,
  authorizePermissions("admin", "doctor"),
  getDoctorsAppointments
);

module.exports = router;
