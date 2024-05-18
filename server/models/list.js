const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/mydatabase1");
const listSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
});
module.exports = mongoose.model("list", listSchema);
