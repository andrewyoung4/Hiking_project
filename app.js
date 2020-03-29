// Bring in need packages and files
const express = require("express");
const morgan = require("morgan");

const hikeRouter = require("../Hiking_project/routes/hikeRoutes");
const userRouter = require("../Hiking_project/routes/userRoutes");

const app = express();

// 1) MIDDLEWARES

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// 3) ROUTES
app.use("/api/v1/hikes", hikeRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   static: "fail",
  //   message: `Cannot find ${req.originalUrl} on this server!`
  // });

  const err = new Error(`Cannot find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 404;

  // When something is passed through next() express treats it as an error
  next(err);
});

// With four parameters express knows this is an error handling middleware
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;
