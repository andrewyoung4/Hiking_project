const express = require("express");
const hikeController = require("../controllers/hikeController");

const router = express.Router();

router.route("/hikes-under-hour").get(hikeController.hikesUnderHour);
router.route("/hike-stats").get(hikeController.getHikeStats);

router
  .route("/")
  .get(hikeController.getAllHikes)
  .post(hikeController.createHike);

router.route("/many").post(hikeController.createHikeMany);

router
  .route("/:id")
  .get(hikeController.getHike)
  .patch(hikeController.updateHike)
  .delete(hikeController.deleteHike);

module.exports = router;
