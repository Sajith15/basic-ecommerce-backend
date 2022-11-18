const jwt = require("jsonwebtoken");

const getAccessToken = (username) => {
  return jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

const getRefreshToken = (username) => {
  return jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { getAccessToken, getRefreshToken };
