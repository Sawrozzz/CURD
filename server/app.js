const routes  = require("./routes/routes");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const cookie = require("cookie-parser");

app.use(express.json());

app.use(cookie());
const jwtSecret = process.env.JWT_SECRET;

app.use(
  cors()
);

app.use(express.urlencoded({ extended: true }));



const port = 3000;
app.use("/", routes);
app.use(express.json());


app.listen(port)