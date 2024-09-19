const devAllowedOrigins = [
  "http://localhost:5173",
  "https://investment-wzp6.onrender.com",
];
const prodAllowedOrigins = [
  "https://investment-build-client.onrender.com",
  "https://investment-wzp6.onrender.com",
];
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
