const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

const PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(morgan("combined"));
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false,
  })
);
app.use(express.static(path.join(__dirname, "build")));
app.get("*", async (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
