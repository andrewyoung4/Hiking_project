const Hike = require("./../models/hikeModel");

exports.getAllHikes = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime
    // results: hikes.length,
    // data: {
    //   tours
    // }
  });
};

exports.getHike = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: "success",
  //   data: {
  //     tour
  //   }
  // });
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

exports.updateHike = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here...>"
    }
  });
};

exports.deleteHike = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null
  });
};
