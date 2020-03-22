const Hike = require("./../models/hikeModel");
const APIFeatures = require("./../utilities/apiFeatures");

exports.hikesUnderHour = async (req, res) => {
  try {
    const hikesUnderHour = await Hike.find({ hours: 0 });
    // const hikesUnderHour = await Hike.find();

    res.status(200).json({
      status: "success",
      results: hikesUnderHour.length,
      data: {
        hikesUnderHour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getAllHikes = async (req, res) => {
  try {
    console.log(req.query);
    // Execute Query
    // req.query - express parses the query string into an easy to use object
    const features = new APIFeatures(Hike.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const hikes = await features.query;

    // Send Response
    res.status(200).json({
      status: "success",
      results: hikes.length,
      data: {
        hikes
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getHike = async (req, res) => {
  try {
    console.log(req.query);

    const features = new APIFeatures(
      Hike.findById(req.params.id),
      req.query
    ).limitFields();
    const hike = await features.query;

    // const hike = await Hike.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        hike
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.createHike = async (req, res) => {
  try {
    const newHike = await Hike.create(req.body);

    // console.log(req.body);
    res.status(201).json({
      status: "success",
      data: {
        hike: newHike
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateHike = async (req, res) => {
  try {
    // new: true - this makes sure we get the updated item back
    const hike = await Hike.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: "success",
      data: {
        hike
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteHike = async (req, res) => {
  try {
    await Hike.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.getHikeStats = async (req, res) => {
  try {
    const stats = await Hike.aggregate([
      {
        $match: {
          ratingAverage: { $gte: 3.5 }
        }
      },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          // _id: "$difficulty",
          num: { $sum: 1 },
          numRatings: { $sum: "$ratingQuantity" },
          avgRating: { $avg: "$ratingAverage" },
          minRating: { $min: "$ratingAverage" },
          maxRating: { $max: "$ratingAverage" }
        }
      },
      {
        $sort: {
          avgRating: 1
        }
      }
      // {
      //   $match: {
      //     // Not Equal - removes easy group
      //     _id: { $ne: "EASY" }
      //   }
      // }
    ]);

    res.status(200).json({
      status: "success",
      data: {
        stats
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
