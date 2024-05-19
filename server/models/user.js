const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/mydatabase1");
mongoose.connect(
  "mongodb+srv://sarojadhikari:saroj1212%40@cluster1.odngn3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1/"
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
