const mongoose = require("mongoose");
const slugify = require("slugify");
const validator = require("validator");

const hikeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A hike must have a name"],
    unique: true,
    trim: true
  },
  slug: {
    type: String
  },
  hours: {
    type: Number,
    default: 1
  },
  minutes: {
    type: Number,
    default: 40
  },
  difficulty: {
    type: String,
    required: [true, "Needs a difficulty"],
    // only for strings
    enum: {
      values: ["easy", "medium", "hard"],
      message: "Difficulty is either: easy, medium, or hard"
    },
    trim: true
  },
  ratingAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be equal to or above 1.0"],
    max: [5, "Rating must be equal to or below 5.0"]
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
    default: "update cover image file name"
  },
  images: {
    type: [String],
    default: ["update image file name"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // Makes it so this is not returned to the use
    select: false
  },
  activeUserHike: {
    type: Boolean,
    default: false
  }
});

// Document Middleware: runs before .save() and .create()
hikeSchema.pre("save", function(next) {
  //this is used for front end routing
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Query Middleware - any strings that start with find
hikeSchema.pre(/^find/, function(next) {
  // hikeSchema.pre("find", function(next) {
  this.find({ activeUserHike: { $ne: true } });
  next();
});

// Aggregation Middleware
hikeSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match: { activeUserHike: { $ne: true } } });
  next();
});

const Hike = mongoose.model("Hike", hikeSchema);

module.exports = Hike;
