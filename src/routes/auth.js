const router = require("express").Router();
const authController = require("../controllers/authentication/authController");
const refreshTokenController = require("../controllers/authentication/refreshTokenController");

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.get("/logout", authController.handleLogout);
router.get("/refresh", refreshTokenController.handleRefreshToken);

module.exports = router;
