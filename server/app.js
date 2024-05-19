const express = require("express");
const userModel = require("./models/user");
const app = express();
const cors = require("cors");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const authenticate = require("./middleware/auth");

app.use(express.json());

app.use(cookie());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/users", authenticate, (req, res) => {

  userModel
    .find({})
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});
app.get("/users/getProfile/:id", authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/users/getUser/:id", authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.put("/users/updateUser/:id",authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndUpdate(
      { _id: id },
      { name: req.body.name, email: req.body.email }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.delete("/users/deleteUser/:id", authenticate, (req, res) => {
  const id = req.params.id;
  userModel
    .findByIdAndDelete(
      { _id: id },
      { name: req.body.name, email: req.body.email }
    )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});



app.post("/create", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).json({ error: "User already exists" });
    const hashPassword = await bcrypt.hash(password, 10)
    const createdUser = await userModel.create({
      email,
      name, password:hashPassword
    })
    res.status(200).send(JSON.stringify(createdUser))
   
    return;
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});
app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email: email, userid: user._id }, "shh");

    
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


app.listen(3000);
