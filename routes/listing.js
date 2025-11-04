const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner , validateListing } =require("../middleware.js");

const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

// index or create route in same path so combined them
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validateListing,
    upload.single('listing[image]'),
  wrapAsync(listingController.createListing)
);



// new route
router.get("/new",isLoggedIn,listingController.renderNewForm );

// combinend show route , update route, delete route
router
  .route("/:id")
  .get(
  wrapAsync(listingController.showListing)
  )
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

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;
