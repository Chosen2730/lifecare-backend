const router = require("express").Router();
const { getDashDetails } = require("../controllers/appointmentLogic");
const {
  authorize,
  authorizePermissions,
} = require("../middlewares/authorization");

router.get(
  "/get-details",
  authorize,
  authorizePermissions("admin"),
  getDashDetails
);

module.exports = router;
