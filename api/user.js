const express = require("express");
const router = express.Router();
const { User } = require("./schemas/user");
const checkJwt = require("./helpers");

router.post("/", checkJwt, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  let registrationStatus = false;
  if (user == null) {
    const newUser = new User({ ...req.body, profile: null });
    await newUser.save();
  } else if (user && user.profile != null) registrationStatus = true;

  return res.status(200).json({ registrationStatus });
});

router.post("/profile", checkJwt, async (req, res) => {
  const data = await User.findOneAndUpdate(
    { email: req.body.email },
    { profile: req.body.profile }
  );

  return res.status(200).json(data);
});

router.get("/mentors", checkJwt, async (req, res) => {
  const mentors = await User.find({ role: "mentor" });
  return res.status(200).json(mentors);
});

module.exports = router;
