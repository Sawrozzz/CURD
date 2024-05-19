const http = require('http')
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
const hostname = "localhost";
app.use("/", routes);
app.use(express.json());
const server = http.createServer(app);

server.listen(port, async(req, res) => {
  console.log(`server started at http://}`);
});