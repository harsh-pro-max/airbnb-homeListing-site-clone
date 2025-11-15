const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// INDEX + CREATE
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

// NEW FORM
router.get("/new", isLoggedIn, listingController.renderNewForm);

// CATEGORY FILTER
router.get("/category/:category", wrapAsync(async (req, res) => {
  const { category } = req.params;
  const allListings = await Listing.find({ category });

  res.render("listings/index.ejs", { allListings });
}));

// ===========================
//        SEARCH ROUTE
// ===========================
router.get("/search", wrapAsync(async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim() === "") {
    req.flash("error", "Please enter something to search.");
    return res.redirect("/listings");
  }

  const regex = new RegExp(query, "i");

  const searchResults = await Listing.find({
    $or: [
      { title: regex },
      { description: regex },
      { location: regex },
      { country: regex },
      { category: regex }
    ]
  });

  res.render("listings/search.ejs", { searchResults, query });
}));

// SHOW / UPDATE / DELETE
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing)
  );

// EDIT
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
