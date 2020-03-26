// Bring in need packages and files
const express = require("express");
const morgan = require("morgan");

const hikeRouter = require("./routes/hikeRoutes");
const userRouter = require("./routes/userRoutes");

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
  res.status(404).json({
    static: "fail",
    message: `Cannot find ${req.originalUrl} on this server!`
  });
});

module.exports = app;
