const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const { auth } = require("express-oauth2-jwt-bearer");

const authConfig = require("./src/auth-config.json");
const { DB_URL, API_PORT } = require("./config.js");
const { User } = require("./schemas/user");
const { Session } = require("./schemas/session");

const app = express();
//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(helmet());
app.use(cors()); //ToDO: cors to allow fe

const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
});

app.get("/api/public", (req, res) => {
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this.",
  });
});

app.get("/api/external", checkJwt, (req, res) => {
  res.send({
    msg: "Your access token was successfully validated!",
  });
});

app.post("/api/user", checkJwt, async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  let registrationStatus = false;
  if (user == null) {
    const newUser = new User({ ...req.body, profile: null });
    await newUser.save();
  } else if (user && user.profile != null) registrationStatus = true;

  return res.status(200).json({ registrationStatus });
});

app.post("/api/user/profile", checkJwt, async (req, res) => {
  const data = await User.findOneAndUpdate(
    { email: req.body.email },
    { profile: req.body.profile }
  );

  return res.status(200).json(data);
});

app.post("/api/session/schedule", checkJwt, async (req, res) => {
  const newSession = new Session(req.body);
  await newSession.save();
  return res.status(200).json(newSession);
});

app.get("/api/mentors", checkJwt, async (req, res) => {
  const mentors = await User.find({ role: "mentor" });
  return res.status(200).json(mentors);
});

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(API_PORT, () =>
      console.log(`api server is listening on ${API_PORT}`)
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

module.exports = app;
