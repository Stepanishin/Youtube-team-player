const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
  favoriteVideos: [
    {
      id: String,
      title: String,
      duration: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
