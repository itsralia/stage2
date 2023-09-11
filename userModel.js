const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: [true, "Please provide a unique user_id"],
    unique: true, // Make sure 'user_id' is unique
  },
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
});

module.exports = mongoose.model("User", UserSchema);
