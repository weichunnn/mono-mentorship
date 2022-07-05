const { auth } = require("express-oauth2-jwt-bearer");
const authConfig = require("../src/auth-config.json");

const checkJwt = auth({
  audience: authConfig.audience,
  issuerBaseURL: `https://${authConfig.domain}/`,
});

module.exports = checkJwt;
