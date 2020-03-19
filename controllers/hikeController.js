const Hike = require("./../models/hikeModel");

exports.getAllHikes = async (req, res) => {
  try {
    const hikes = await Hike.find();

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

exports.deleteHike = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null
  });
};
