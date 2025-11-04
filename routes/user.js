const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

// combined signup route
router
    .route("/signup")
    .get(userController.renderSignup)
    .post(wrapAsync(userController.signup)
);

// combined login route
router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login',
        failureFlash:true,
    }),
    userController.login
);

router.get("/logout",userController.logout);

module.exports = router;

