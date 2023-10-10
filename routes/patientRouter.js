const router = require("express").Router();
const {
  createPatient,
  getPatient,
  updatePatient,
  getAllPatients,
} = require("../controllers/patientLogic");
const {
  authorize,
  authorizePermissions,
} = require("../middlewares/authorization");

router.post("/", authorize, createPatient);
router.get("/", authorize, getPatient);
router.get("/all", authorize, authorizePermissions("admin"), getAllPatients);
router.patch("/", authorize, updatePatient);

module.exports = router;
