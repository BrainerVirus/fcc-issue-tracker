const mongoose = require("mongoose");
require("dotenv").config();

module.exports.connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to MongoDB");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.disconnect = async () => {
  try {
    await mongoose.disconnect(() => {
      console.log("Connection closed");
    });
  } catch (error) {
    console.log(error);
  }
};
