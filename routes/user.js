const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

const userController = require("../controllers/users.js");

// signup
router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signup));

// verify OTP
router
  .route("/verify-otp")
  .get(userController.renderVerifyOTP)
  .post(wrapAsync(userController.verifyOTP));

// login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// logout
router.get("/logout", userController.logout);

module.exports = router;
