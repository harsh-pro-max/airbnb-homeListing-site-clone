const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");

module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({
            email,
            username,
            isVerified: false
        });

        const registeredUser = await User.register(newUser, password);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        registeredUser.otp = otp;
        registeredUser.otpExpiry = Date.now() + 5 * 60 * 1000;
        await registeredUser.save();

        // Send OTP email
        await sendEmail(email, otp);

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

module.exports.verifyOTP = async (req, res) => {
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

// ⭐ RESEND OTP — NEW FUNCTION
module.exports.resendOTP = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
        req.flash("error", "User not found.");
        return res.redirect("/signup");
    }

    // Create new OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = newOtp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    // send new OTP
    await sendEmail(user.email, newOtp);

    req.flash("success", "New OTP sent successfully!");
    res.redirect(`/verify-otp?user=${user._id}`);
};

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
