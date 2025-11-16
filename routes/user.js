const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

const userController = require("../controllers/users.js");

// SIGNUP
router
  .route("/signup")
  .get(userController.renderSignup)
  .post(wrapAsync(userController.signup));

// VERIFY OTP
router
  .route("/verify-otp")
  .get(userController.renderVerifyOTP)
  .post(wrapAsync(userController.verifyOTP));

// RESEND OTP ⭐ NEW
router.get("/resend-otp/:id", wrapAsync(userController.resendOTP));

// LOGIN
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

// LOGOUT
router.get("/logout", userController.logout);

module.exports = router;
