const fs = require('fs');
const mongoose = require("mongoose");
const Hike = require('./../models/hikeModel');

// Connect to DB
mongoose
  .connect("mongodb://127.0.0.1:27017/theHiker", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connection successfull"));

  const hikes = JSON.parse(fs.readFileSync(`${__dirname}/data-to-import.json`, 'utf-8'));

  // Import data
    const importData = async () => {
        try {
          await Hike.create(hikes);
          console.log("Data imported")
          process.exit();
        } catch (err) {
            console.log(err)
        }
    }


  // Delete data
  const deleteData = async () => {
    try {
        await Hike.deleteMany();
        console.log("Data deleted")
        process.exit();
      } catch (err) {
          console.log(err)
      }
  }


  if(process.argv[2] === '--delete') {
    deleteData();
  } else if (process.argv[2] === '--import') {
      importData();
  }

  console.log(process.argv);