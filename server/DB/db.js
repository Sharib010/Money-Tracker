const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  process.env.DATABASE,
  { useNewUrlParser: true },
  () => {
    console.log("database connected successful");
  }
);
