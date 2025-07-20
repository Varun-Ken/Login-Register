const { registerUser, loginUser, logoutUser, checkAuth } = require("../controller/userController");
const router = require("express").Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", checkAuth);

module.exports = router