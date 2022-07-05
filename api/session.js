const express = require("express");
const router = express.Router();
const { Session } = require("./schemas/session");
const checkJwt = require("./helpers");

router.post("/schedule", checkJwt, async (req, res) => {
  const newSession = new Session(req.body);
  await newSession.save();
  return res.status(200).json(newSession);
});

module.exports = router;
