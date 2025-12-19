const Booking = require("../models/booking");
const Listing = require("../models/listing");
const User = require("../models/user"); // For owner and user email data
const sendBookingEmail = require("../utils/sendBookingEmail"); // Email utility

module.exports.renderBookingForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("bookings/new", { listing });
};

// ✅ Preview Booking Page
module.exports.previewBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut, rooms } = req.body;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkOutDate <= checkInDate) {
    req.flash("error", "Check-Out must be after Check-In.");
    return res.redirect(`/bookings/${id}/new`);
  }

  const roomCount = parseInt(rooms);
  if (roomCount > listing.roomsAvailable) {
    req.flash("error", `Only ${listing.roomsAvailable} rooms are available.`);
    return res.redirect(`/bookings/${id}/new`);
  }

  const totalDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const totalPrice = listing.price * totalDays * roomCount;

  res.render("bookings/preview", {
    listing,
    checkIn,
    checkOut,
    rooms: roomCount,
    totalDays,
    totalPrice,
  });
};

// ✅ Confirm Final Booking + Send Email
module.exports.confirmBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut, rooms } = req.body;
  const listing = await Listing.findById(id).populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  const roomCount = parseInt(rooms);
  if (roomCount > listing.roomsAvailable) {
    req.flash("error", `Only ${listing.roomsAvailable} rooms are available.`);
    return res.redirect(`/bookings/${id}/new`);
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const totalDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
  const totalPrice = listing.price * totalDays * roomCount;

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    roomsBooked: roomCount,
    totalPrice,
    status: "confirmed",
  });

  listing.roomsAvailable -= roomCount;
  await listing.save();
  await booking.save();

  // 📧 Send booking email to both user and owner
  try {
    const user = await User.findById(req.user._id); // latest user object
    const owner = listing.owner;

    await sendBookingEmail({
      user,
      owner,
      listing,
      booking
    });
  } catch (err) {
    console.error("📧 Email send failed:", err.message);
  }

  req.flash("success", `Dummy Payment of ₹${totalPrice} completed! Booking confirmed.`);
  res.redirect("/bookings/my");
};

// ✅ Show Logged-in User's Bookings
module.exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing")
    .populate("user") 
    .sort({ createdAt: -1 });

  res.render("bookings/my", { bookings });
};

// ✅ Cancel a Booking
module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id).populate("listing");

  if (!booking) {
    req.flash("error", "Booking not found.");
    return res.redirect("/bookings/my");
  }

  if (booking.status === "cancelled") {
    req.flash("info", "Booking already cancelled.");
    return res.redirect("/bookings/my");
  }

  booking.status = "cancelled";
  await booking.save();

  if (booking.listing && booking.roomsBooked) {
    booking.listing.roomsAvailable += booking.roomsBooked;
    await booking.listing.save();
  }

  req.flash("success", "Booking cancelled.");
  res.redirect("/bookings/my");
};
