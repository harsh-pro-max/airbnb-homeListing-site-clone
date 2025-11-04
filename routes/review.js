const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");
// Reviews 
// Post review route
router.post(
  "/",
  isLoggedIn,
  validateReview ,
  wrapAsync(reviewController.createReview));

//Delete Review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview));

module.exports= router;