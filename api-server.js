const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");
const { auth } = require("express-oauth2-jwt-bearer");

const authConfig = require("./src/auth-config.json");
const { DB_URL, API_PORT } = require("./config.js");

const app = express();
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

const start = async () => {
  try {
    await mongoose.connect(DB_URL);
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
