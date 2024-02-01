const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/demothird");
const userSchema = mongoose.Schema({
  userName: String,
  password: String,
  fatherName: String,
  motherName: String,
  desc : String,
  categories:{
    type:Array,
    default:[]
  },
  dateAdded: {
    type:Date,
    default: Date.now()
  },

});
module.exports = mongoose.model("user",userSchema);