const Hike = require("./../models/hikeModel");

exports.getAllHikes = async (req, res) => {
  try {
    // req.query - express parses the query string into an easy to use object
    // This creates a hard copy of the req.query. This allows us to change queryObj without changing req.query
    const queryObj = { ...req.query };

    console.log(req.query);

    // Build Query
    // 1) Filtering - localhost:3000/api/v1/hikes?difficulty=hard
    const excludeTheseFields = ["page", "sort", "limit", "fields"];
    excludeTheseFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // console.log(queryStr);
    console.log(JSON.parse(queryStr));

    const query = Hike.find(queryStr);
    // const query = Hike.find(JSON.parse(queryStr));

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
