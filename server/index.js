const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const dotenv = require("dotenv");
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
PORT = 4000;
dotenv.config({ path: "./config.env" });
require("./DB/db");

const routes = require("./router/routes");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`app started at Port ${PORT}`);
});
