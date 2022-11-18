const router = require("express").Router();
const authController = require("../controllers/authController");
const refreshTokenController = require("../controllers/refreshTokenController");

router.post("/register", authController.handleRegister);
router.post("/login", authController.handleLogin);
router.get("/logout", authController.handleLogout);
router.get("/refresh", refreshTokenController.handleRefreshToken);

module.exports = router;
