// controllers/users.js
const User = require("../models/user");
const Booking = require("../models/booking");
const Listing = require("../models/listing");
const sendEmail = require("../utils/sendEmail");
const util = require("util");

/* ================================
   SIGNUP + EMAIL OTP VERIFICATION
================================ */

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { name, username, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      username,
      isVerified: false,
    });

    const registeredUser = await User.register(newUser, password);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    registeredUser.otp = otp;
    registeredUser.otpExpiry = Date.now() + 5 * 60 * 1000;
    await registeredUser.save();

    // Send OTP email (signup verification)
    const html = `
      <h2>Welcome to Wanderlust, ${name} 👋</h2>
      <p>Thank you for creating an account!</p>
      <h3>Your Username:</h3>
      <p><strong>${username}</strong></p>
      <h3>Your OTP for email verification:</h3>
      <p style="font-size: 22px; letter-spacing: 6px;">
          <strong>${otp}</strong>
      </p>
      <p>This OTP expires in 5 minutes.</p>
      <br/>
      <p>If you ever forget your username, check this email again.</p>
      <p style="color: gray;">– Wanderlust Team</p>
    `;
    await sendEmail(email, "Wanderlust OTP Verification Code", html);

    req.flash("success", "OTP sent to your email. Verify to continue.");
    res.redirect(`/verify-otp?user=${registeredUser._id}`);
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderVerifyOTP = (req, res) => {
  res.render("users/verifyOtp", { userId: req.query.user });
};

module.exports.verifyOTP = async (req, res, next) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    req.flash("error", "Invalid user");
    return res.redirect("/signup");
  }

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    req.flash("error", "Invalid or expired OTP");
    return res.redirect(`/verify-otp?user=${userId}`);
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  req.login(user, (err) => {
    if (err) return next(err);
    req.flash("success", "Account verified successfully!");
    res.redirect("/listings");
  });
};

/* ============= RESEND OTP ============= */

module.exports.resendOTP = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    req.flash("error", "User not found.");
    return res.redirect("/signup");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 5 * 60 * 1000;
  await user.save();

  const html = `
    <h2>Wanderlust Verification</h2>
    <p>Your new OTP: <strong style="letter-spacing:6px">${otp}</strong></p>
    <p>This OTP expires in 5 minutes.</p>
  `;

  await sendEmail(user.email, "Wanderlust - New OTP", html);

  req.flash("success", "New OTP sent successfully!");
  res.redirect(`/verify-otp?user=${user._id}`);
};

/* ============= LOGIN / LOGOUT ============= */

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  if (!req.user.isVerified) {
    req.flash("error", "Please verify your email before login.");
    return res.redirect("/login");
  }

  req.flash("success", "Welcome back!");
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/listings");
  });
};

/* ============= PASSWORD RESET (OTP BASED) ============= */

module.exports.renderForgotPassword = (req, res) => {
  res.render("users/forgotPassword.ejs");
};

module.exports.sendResetOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    req.flash("error", "Please enter your registered email.");
    return res.redirect("/forgot-password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    req.flash("error", "No account found with that email.");
    return res.redirect("/forgot-password");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  user.otpExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  const html = `
    <h2>Reset your Wanderlust password</h2>
    <p>Use the OTP below to reset password:</p>
    <h1 style="letter-spacing:6px">${otp}</h1>
    <p>This OTP expires in 10 minutes.</p>
  `;

  await sendEmail(user.email, "Wanderlust - Password Reset OTP", html);

  req.flash("success", "OTP sent to your email.");
  res.redirect(`/reset-password?user=${user._id}`);
};

module.exports.renderResetPassword = (req, res) => {
  const userId = req.query.user;
  res.render("users/resetPassword.ejs", { userId });
};

module.exports.resetPassword = async (req, res) => {
  try {
    const { userId, otp, password, confirmPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      req.flash("error", "User not found.");
      return res.redirect("/forgot-password");
    }

    if (!otp || user.otp !== otp || user.otpExpiry < Date.now()) {
      req.flash("error", "Invalid or expired OTP.");
      return res.redirect(`/reset-password?user=${user._id}`);
    }

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match.");
      return res.redirect(`/reset-password?user=${user._id}`);
    }

    const setPassword = util.promisify(user.setPassword).bind(user);
    await setPassword(password);

    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    req.flash("success", "Password reset successful. Please login.");
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong.");
    res.redirect("/forgot-password");
  }
};

/* ===== USER DASHBOARD ===== */
module.exports.renderDashboard = async (req, res) => {
  
  const user = await User.findById(req.user._id); // ✅ Fetch fresh updated user
  const listings = await Listing.find({ owner: user._id });
  const bookings = await Booking.find({ user: user._id }).populate("listing");

  res.render("users/dashboard.ejs", {
    user,
    listings,
    bookings,
    userListingCount: listings.length,
    userBookingCount: bookings.length,
    recentBookings: bookings.slice(0, 5),
  });
};

/* ===== EDIT PROFILE PAGE ===== */
module.exports.renderEditProfile = async (req, res) => {
  res.render("users/editProfile", { user: req.user });
};

/* ===== UPDATE AVATAR + NAME (Combined Save) ===== */
module.exports.updateProfile = async (req, res) => {
  const user = req.user;

  // Update name if provided
  if (req.body.name) {
    user.name = req.body.name;
  }

  // If new avatar is uploaded
  if (req.file) {
    // Remove old avatar from Cloudinary
    if (user.avatar && user.avatar.filename) {
      try {
        await cloudinary.uploader.destroy(user.avatar.filename);
      } catch (err) {
        console.warn("Failed to delete previous avatar:", err.message);
      }
    }

    // Set new avatar
    user.avatar = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  await user.save();
  req.flash("success", "Profile updated successfully.");
  res.redirect("/dashboard");
};