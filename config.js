const API_PORT = process.env.API_PORT || 3001;
const APP_PORT = process.env.APP_PORT || 3000;
const APP_ORIGIN = `http://localhost:${APP_PORT}`;
const DB_USER = process.env.DB_USER || "db-dev";
const DB_PASSWORD = process.env.DB_PASSWORD || "IstUBcf6Ps11omUS";
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@dev.lcqtxix.mongodb.net/?retryWrites=true&w=majority`;

module.exports = { API_PORT, DB_URL };
