const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
