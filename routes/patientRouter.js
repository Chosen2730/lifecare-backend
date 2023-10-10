const router = require("express").Router();
const {
  createPatient,
  getPatient,
  updatePatient,
  getAllPatients,
  searchPatient,
  getSinglePatient,
} = require("../controllers/patientLogic");
const {
  authorize,
  authorizePermissions,
} = require("../middlewares/authorization");

router.post("/", authorize, createPatient);
router.get("/", authorize, getPatient);
router.get("/all", authorize, authorizePermissions("admin"), getAllPatients);
router.patch("/", authorize, updatePatient);
router.get(
  "/search/:key",
  authorize,
  authorizePermissions("admin", "doctor"),
  searchPatient
);
router.get("/:email", authorize, getSinglePatient);

module.exports = router;
