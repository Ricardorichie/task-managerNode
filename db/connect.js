const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTON_STRING);
    console.log(
      //   connect?.connection?.host,
      //   connect?.connection?.name,
      "DATABASE CONNECTED"
    );
  } catch (error) {
    console.log(error, "error connecting to database");
    process.exit(1);
  }
};
