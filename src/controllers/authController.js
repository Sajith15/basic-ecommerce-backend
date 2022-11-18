const bcrypt = require("bcrypt");
const connectDB = require("../config/dbConn");
const getUser = require("../utils/getUser");
const { validateRegister, validateLogin } = require("../validations/validateUser");
const { databases, tables } = require("../constants/dbTableConstants");
const { getAccessToken, getRefreshToken } = require("../utils/createJWT");
require("dotenv").config();

const handleRegister = async (req, res) => {
  const { username, password, type } = req.body;

  //Validate data
  const isValid = validateRegister({ username, password, type });

  //Invalid checks
  if (isValid.error)
    return res.status(400).json({ message: isValid.error.details[0].message });

  try {
    //Connect to pool
    const pool = await connectDB(databases.ECOMMERCE);

    //Hash Password
    const hashedPwd = await bcrypt.hash(password, 10); // salt rounds

    //Insert into DB
    const [result] = await pool.query(
      `INSERT INTO ${tables.USERS} (username, password, type) VALUES (?, ?, ?)`,
      [username, hashedPwd, type]
    );

    //Get ID from result
    const id = result.insertId;

    //Get user by id
    const user = await getUser(databases.ECOMMERCE, tables.USERS, "id", id);
    const userName = user.username;

    //Create Access and Refresh Tokens
    const accessToken = getAccessToken(userName);
    const refreshToken = getRefreshToken(userName);

    //Set Refresh Token to cookies
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Send Access Token
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    // Error code 1062 for duplicate data in mysql
    error.errno === 1062
      ? res.status(403).json({ message: "Username already exists" })
      : res.status(501).json({ message: "Server Error" });
  }
};

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  //Validate data
  const isValid = validateLogin({ username, password });

  //Invalid checks
  if (isValid.error)
    return res.status(400).json({ message: isValid.error.details[0].message });

  //find user by username
  const user = await getUser(databases.ECOMMERCE, tables.USERS, "username", username);
  if (!user) return res.sendStatus(401); //Unauthorized

  //Check whether password is right
  const match = await bcrypt.compare(password, user.password);

  if (match) {
    //Create Access and Refresh Tokens
    const accessToken = getAccessToken(username);
    const refreshToken = getRefreshToken(username);

    //Set Refresh Token to cookies
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Send Access Token
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};

const handleLogout = (req, res) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content

  //   const refreshToken = cookies.jwt;

  //clear cookie
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "none",
    secure: process.env.NODE_ENV !== "development",
  });
  res.sendStatus(204);
};

module.exports = { handleRegister, handleLogin, handleLogout };
