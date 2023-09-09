const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    //${mongoose.connection.host} = for printing address of cluster in console
    // console.log(`Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta.white);
  } catch (err) {
    // console.log(`MONGO Connect Error ${err}`.bgRed.white);
  }
};


module.exports = connectDB;