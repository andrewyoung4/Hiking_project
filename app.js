// Bring in need packages and files
const express = require("express");
const morgan = require("morgan");

const hikeRouter = require("../Hiking_project/routes/hikeRoutes");
const userRouter = require("../Hiking_project/routes/userRoutes");

const app = express();

// 1) MIDDLEWARES

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

// app.use((req, res, next) => {
//   req.requestTime = new Date().toISOString();
//   next();
// });

// 3) ROUTES
app.use("/api/v1/hikes", hikeRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
