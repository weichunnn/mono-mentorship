const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const checkJwt = require("./helpers");

const { DB_URL, API_PORT, APP_ORIGIN } = require("./config.js");
const user = require("./user");
const session = require("./session");

const app = express();
//middleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(helmet());
app.use(cors({ origin: APP_ORIGIN }));

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

app.use("/api/user", user);
app.use("/api/session", session);

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
