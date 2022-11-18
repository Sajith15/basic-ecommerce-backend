const { getAccessToken } = require("../../utils/createJWT");
const { databases, tables } = require("../../constants/dbTableConstants");
const getUser = require("../../utils/getUser");
require("dotenv").config();
const jwt = require("jsonwebtoken")

const handleRefreshToken = (req, res) => {
  //Refresh token will be received in cookies
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  // Verify refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403);
      const username = decoded.username;

      //Check for username in database
      const user = await getUser(databases.ERPVERSE_MASTERDB, tables.USERS, "username", username);
      if (!user) return res.sendStatus(403);

      //Get new access token
      const accessToken = getAccessToken(user.username);

      //Send new access token
      res.json({ accessToken });
    }
  );
};

module.exports = { handleRefreshToken };
