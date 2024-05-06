const mongoose = require("mongoose");
module.exports = async function () {
  try {
    const conn = await mongoose.connect(`${process.env.DB}/nutec24`, {

    });
    console.log(
      "DataBase Connected Successfully on port " + conn.connection.host
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    else console.log("Database connection failed. Exiting!");
    process.exit(1);
  }
};
