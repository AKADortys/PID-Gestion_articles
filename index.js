const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));
app.use(expressLayouts);
app.set("layout", "layout");
app.use("/images", express.static("src/images"));

app.use("/types", require("./src/routes/type.route"));
app.use("/articles", require("./src/routes/article.route"));

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
