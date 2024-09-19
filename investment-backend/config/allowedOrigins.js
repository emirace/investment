const devAllowedOrigins = [
  "http://localhost:5173",
  "https://investment-dun.vercel.app",
];
const prodAllowedOrigins = [
  "https://investment-wzp6.onrender.com",
  "https://investment-dun.vercel.app",
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
