const express = require("express");
const hikeController = require("../controllers/hikeController");

const router = express.Router();

router.route("/hikes-under-hour").get(hikeController.hikesUnderHour);

router
  .route("/")
  .get(hikeController.getAllHikes)
  .post(hikeController.createHike);

router
  .route("/:id")
  .get(hikeController.getHike)
  .patch(hikeController.updateHike)
  .delete(hikeController.deleteHike);

module.exports = router;
