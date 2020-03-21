const Hike = require("./../models/hikeModel");

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
    // req.query - express parses the query string into an easy to use object
    // This creates a hard copy of the req.query. This allows us to change queryObj without changing req.query
    const queryObj = { ...req.query };

    console.log(req.query);

    // Build Query
    // 1A) Filtering - localhost:3000/api/v1/hikes?difficulty=hard
    const excludeTheseFields = ["page", "sort", "limit", "fields"];
    excludeTheseFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // Hike.find returns a query
    // We are saving it in the query variable so we can chain more methods to it
    let query = Hike.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("createdAt");
    }

    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
      // query = query.select('name ratingAverage difficulty');
    } else {
      query = query.select("-__v");
    }

    // 4) Pagination
    // Converts string to number
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numHikes = await Hike.countDocuments();
      if (skip >= numHikes) throw new Error("This page does not exist");
    }

    // Execute Query
    const hikes = await query;

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
    const hike = await Hike.findById(req.params.id);

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
