const mongoose = require("mongoose");
require("dotenv").config();

const dbConfig = {};
// connect to database
exports.Connect = async () => {
  const URI = process.env.MONGODB_URI;
  if (!URI) {
    console.log("No database URI");
  }
  try {
    mongoose.connect(URI, dbConfig);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      console.log("Database Connected");
    });
  } catch (error) {
    console.log(error);
  }
};
