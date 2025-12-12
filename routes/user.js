// routes/user.js
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

// RESEND OTP
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

/* ===== Password reset routes ===== */

// show form to enter email to start reset
router.get("/forgot-password", userController.renderForgotPassword);

// post email -> send OTP and redirect to reset form
router.post("/forgot-password", wrapAsync(userController.sendResetOTP));

// render reset form (userId passed as query ?user=XXXX)
router.get("/reset-password", userController.renderResetPassword);

// submit reset form (otp + new password + userId in body)
router.post("/reset-password", wrapAsync(userController.resetPassword));

module.exports = router;
