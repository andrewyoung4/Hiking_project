const mongoose = require("mongoose");

const hikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A hike must have a name"],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  hikeTime: {
    type: { Number, Number },
    required: [true, "A hike must have a time"]
  }
});

const Hike = mongoose.model("Hike", hikeSchema);

module.exports = Hike;
