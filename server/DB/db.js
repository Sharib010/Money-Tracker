const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://Sharib01:Sharib01@cluster0.xsgsfge.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("database connected successful");
  }
);
