const express = require('express')
const userModel = require('./models/user')
const app = express();
const cors = require('cors');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
app.use(express.json());

app.use(cookie());
 
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend running on localhost:5173
    credentials: true, // Allow credentials (cookies) to be included
  })
);

app.use(express.urlencoded({ extended: true }));


app.get('/',(req, res)=>{

    res.send("hello")
})

app.post("/register", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (user) return res.status(500).json({ error: "User already exists" });

    bcrypt.genSalt(10, async (err, salt) => {
      if (err) throw err;
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) throw err;
        user = await userModel.create({
          name,
          email,
          password: hash,
        });
        let token = jwt.sign(
          {
            email: email,
            userid: user._id,
          },
          "shh"
        );
          res.cookie("token", token)
      
        res.status(200).json({ token });
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});


// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   userModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       if (user.password === password) {
//         res.json("Success");
//       } else {
//         req.json("Password is incorrect");
//       }
//     } else {
//       res.json("No record Existed");
//     }
//   });
// });

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ email: email, userid: user._id }, "shh");
        res.cookie("token", token);
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



app.listen(3000)