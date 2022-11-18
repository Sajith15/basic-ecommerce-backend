const jwt = require("jsonwebtoken");
const getUser = require("../utils/getUser");
const { databases, tables } = require("../constants/dbTableConstants");

const verifyJWT = (req, res, next) => {
  // Get auth header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // If no auth header found
  if (!authHeader?.startsWith("Bearer ")) {
    console.log("Unauthorized call");
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extract access token from auth header
  const token = authHeader.split(" ")[1];

  // Verify extracted access token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    // Check for username in database
    const user = await getUser(
      databases.ECOMMERCE,
      tables.USERS,
      "username",
      decoded.username
    );

    if (!user) return res.status(403).json({ message: "Forbidden" });

    req.username = user.username;
    req.userId = user.id;

    next();
  });
};

module.exports = verifyJWT;
