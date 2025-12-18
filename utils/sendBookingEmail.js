// utils/sendBookingEmail.js
const sendEmail = require("./sendEmail");

module.exports = async function sendBookingEmail({ user, owner, listing, booking }) {
  const userHtml = `
    <h2>Hi ${user.username},</h2>
    <p>Your booking for <strong>${listing.title}</strong> has been confirmed ✅</p>
    <p><strong>Location:</strong> ${listing.location}, ${listing.country}</p>
    <p><strong>Check-In:</strong> ${booking.checkIn.toDateString()}</p>
    <p><strong>Check-Out:</strong> ${booking.checkOut.toDateString()}</p>
    <p><strong>Total Amount:</strong> ₹${booking.totalPrice.toLocaleString("en-IN")}</p>
    <p>Thank you for booking with Wanderlust!</p>
  `;

  const ownerHtml = `
    <h2>Hi ${owner.username},</h2>
    <p>Your listing <strong>${listing.title}</strong> has been booked 🎉</p>
    <p><strong>Booked by:</strong> ${user.username}</p>
    <p><strong>Check-In:</strong> ${booking.checkIn.toDateString()}</p>
    <p><strong>Check-Out:</strong> ${booking.checkOut.toDateString()}</p>
    <p><strong>Total Amount:</strong> ₹${booking.totalPrice.toLocaleString("en-IN")}</p>
  `;

  // Send to user
  await sendEmail(user.email, "Booking Confirmed - Wanderlust", userHtml);

  // Send to owner
  await sendEmail(owner.email, "Your Listing Was Booked!", ownerHtml);
};
