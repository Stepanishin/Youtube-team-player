const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/favorite/toggle", async (req, res) => {
  const { email, video } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Check if the video is already in favorites
    const videoIndex = user.favoriteVideos.findIndex((v) => v.id === video.id);

    if (videoIndex >= 0) {
      // Delete the video from favorites if it's already there
      user.favoriteVideos.splice(videoIndex, 1);
      await user.save();
      return res
        .status(200)
        .send({ message: "Video removed from favorites", user });
    } else {
      // Add the video to favorites if it's not there yet
      user.favoriteVideos.push(video);
      await user.save();
      return res
        .status(200)
        .send({ message: "Video added to favorites", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.get("/favoriteList", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send({ message: "Google ID is required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send({ favoriteVideos: user.favoriteVideos });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router;
