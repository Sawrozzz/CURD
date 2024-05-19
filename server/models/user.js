const mongoose = require("mongoose");
require("dotenv").config();



// mongoose.connect("mongodb://127.0.0.1:27017/mydatabase1");
mongoose.connect(
  process.env.MONGODB_URI
);

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("user", userSchema);
