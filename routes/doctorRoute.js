const router = require("express").Router();
const {
  createDoctor,
  getDoctor,
  updateDoctor,
  getAllDoctors,
  getSpecializations,
  getDoctors,
} = require("../controllers/doctorLogic");
const {
  authorize,
  authorizePermissions,
} = require("../middlewares/authorization");

router.post("/", authorize, createDoctor, authorizePermissions("doctor"));
router.get("/", authorize, getDoctor);
router.get("/doctors", authorize, getDoctors);
router.get("/specializations", authorize, getSpecializations);
router.get("/all", authorize, authorizePermissions("admin"), getAllDoctors);
router.patch("/", authorize, updateDoctor);

module.exports = router;
