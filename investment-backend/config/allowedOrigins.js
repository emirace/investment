const devAllowedOrigins = ["http://localhost:5173"];
const prodAllowedOrigins = ["https://investment-build-client.onrender.com"];
const dotenv = require("dotenv");

dotenv.config();

// Select the correct allowed origins based on the environment
const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? devAllowedOrigins
    : prodAllowedOrigins;

module.exports = {
  allowedOrigins,
};
