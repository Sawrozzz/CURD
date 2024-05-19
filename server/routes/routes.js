const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const authenticate = require('../middleware/auth')
// const { model } = require("mongoose");
const router = express.Router()
app.use(express.json());
const userModel = require('../models/user')

app.use(cookie());
const jwtSecret = process.env.JWT_SECRET;

app.use(cors());

app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.send("hello");
});

router.get("/users", (req, res) => {
  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
router.get("/users/getProfile/:id", authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.get("/users/getUser/:id", authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.put("/users/updateUser/:id", authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.delete("/users/deleteUser/:id", authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(
      { _id: id },
      { name: req.body.name, email: req.body.email }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

router.post("/create", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).json({ error: "User already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      email,
      name,
      password: hashPassword,
    });
    res.status(200).send(JSON.stringify(createdUser));

    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});
router.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).json({ error: "User already exists" });
    const hashPassword = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({
      email,
      name,
      password: hashPassword,
    });
    res.status(200).send(JSON.stringify(createdUser));

    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email: email, userid: user._id }, jwtSecret);

        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "Invalid credentials" });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
