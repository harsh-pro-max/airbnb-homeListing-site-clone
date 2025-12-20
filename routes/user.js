const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const userController = require("../controllers/users.js");
const { isLoggedIn } = require("../middleware");

// ✅ Add multer + cloudinary upload
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

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

// PASSWORD RESET
router.get("/forgot-password", userController.renderForgotPassword);
router.post("/forgot-password", wrapAsync(userController.sendResetOTP));
router.get("/reset-password", userController.renderResetPassword);
router.post("/reset-password", wrapAsync(userController.resetPassword));

// ✅ USER DASHBOARD
router.get("/dashboard", isLoggedIn, wrapAsync(userController.renderDashboard));

// ✅ EDIT PROFILE PAGE
router.get("/edit-profile", isLoggedIn, wrapAsync(userController.renderEditProfile));

// ✅ UPDATE PROFILE (avatar + name)
router.post(
  "/users/update-profile",
  isLoggedIn,
  upload.single("avatar"),
  wrapAsync(userController.updateProfile)
);

module.exports = router;