const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/google", async (req, res) => {
  const { email, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, role });
      await user.save();
    }

    res.status(200).send({ message: "Authentication successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

module.exports = router;
