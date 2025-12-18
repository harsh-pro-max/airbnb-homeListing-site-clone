const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings");
const { isLoggedIn } = require("../middleware");

// ✅ 1. Show all bookings for logged-in user (moved UP to avoid :id conflicts)
router.get("/my", isLoggedIn, bookingController.getMyBookings);

// ✅ 2. Show booking form for specific listing
router.get("/:id/new", isLoggedIn, bookingController.renderBookingForm);

// ✅ 3. Preview dummy payment after user fills form
router.post("/:id/preview", isLoggedIn, bookingController.previewBooking);

// ✅ 4. Confirm booking after dummy payment
router.post("/:id/confirm", isLoggedIn, bookingController.confirmBooking);

// ✅ 5. Cancel a booking
router.delete("/:id", isLoggedIn, bookingController.cancelBooking);

module.exports = router;
