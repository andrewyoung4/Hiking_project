const mongoose = require("mongoose");

const hikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A hike must have a name"],
    unique: true,
    trim: true
  },
  hikeTime: {
    type: { Number, Number },
    required: [true, "A hike must have a time"]
  },
  difficulty: {
    type: String,
    required: [true, "Needs a difficulty"]
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  description: {
    type: [String],
    trim: true,
    default: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fermentum leo vel orci porta. Urna molestie at elementum eu facilisis. Volutpat odio facilisis mauris sit amet massa vitae. Sodales neque sodales ut etiam sit amet nisl. Nec tincidunt praesent semper feugiat nibh. Fusce id velit ut tortor pretium viverra suspendisse potenti.",
      "Sed egestas egestas fringilla phasellus faucibus. Dui accumsan sit amet nulla facilisi morbi tempus iaculis urna. Sit amet aliquam id diam. Amet tellus cras adipiscing enim eu turpis egestas pretium aenean. Ac turpis egestas maecenas pharetra convallis. Sit amet justo donec enim diam vulputate ut pharetra sit. Eu non diam phasellus vestibulum lorem. Dis parturient montes nascetur ridiculus mus mauris vitae. Augue neque gravida in fermentum et sollicitudin. Et netus et malesuada fames ac turpis."
    ]
  },
  imageCover: {
    type: String,
    required: [true, "Needs a cover image"]
  },
  images: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const Hike = mongoose.model("Hike", hikeSchema);

module.exports = Hike;
