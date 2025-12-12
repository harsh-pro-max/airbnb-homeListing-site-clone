// utils/sendEmail.js
const nodemailer = require("nodemailer");

async function sendEmail(to, subject, html) {
  try {
    console.log("SMTP LOGIN:", process.env.BREVO_SMTP_LOGIN);
    console.log("SMTP FROM:", process.env.BREVO_EMAIL_FROM);

    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_SERVER,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_LOGIN,
        pass: process.env.BREVO_SMTP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Wanderlust" <${process.env.BREVO_EMAIL_FROM}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully!", info.messageId);
    return info;
  } catch (err) {
    console.error("SMTP Email Error >>>", err);
    throw new Error("Email sending failed");
  }
}

module.exports = sendEmail;
