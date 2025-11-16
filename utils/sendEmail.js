const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // must be false on render
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        const info = await transporter.sendMail({
            from: `"Wanderlust" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Your OTP Code",
            html: `
                <h2>Your OTP Code</h2>
                <p>Your verification code is:</p>
                <h1>${otp}</h1>
                <p>This OTP will expire in 5 minutes.</p>
            `,
        });

        console.log("Email sent:", info.response);
    } catch (err) {
        console.log("Email Error:", err);
        throw new Error("Email sending failed");
    }
};

module.exports = sendEmail;
