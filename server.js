const mongoose = require("mongoose");
const app = require("./app");

// Connect to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/theHiker", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connection successfull"));

const PORT = 3000;

// Start Server
const port = PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
