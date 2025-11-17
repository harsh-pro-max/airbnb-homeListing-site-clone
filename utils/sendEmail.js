const nodemailer = require("nodemailer");

async function sendEmail(to, otp) {
    try {

        console.log("SMTP LOGIN:", process.env.BREVO_SMTP_LOGIN);
        console.log("SMTP FROM:", process.env.BREVO_EMAIL_FROM);

        const transporter = nodemailer.createTransport({
            host: process.env.BREVO_SMTP_SERVER,
            port: Number(process.env.BREVO_SMTP_PORT),
            secure: false,
            auth: {
                user: process.env.BREVO_SMTP_LOGIN,
                pass: process.env.BREVO_SMTP_PASSWORD
            },
        });

        const info = await transporter.sendMail({
            from: `"Wanderlust" <${process.env.BREVO_EMAIL_FROM}>`,
            to,
            subject: "Your Wanderlust OTP Verification Code",
            html: `
                <h2>Wanderlust Verification</h2>
                <p>Your OTP:</p>
                <h1 style="letter-spacing:6px">${otp}</h1>
                <p>This OTP expires in 5 minutes.</p>
            `
        });

        console.log("Email sent successfully!", info.messageId);

    } catch (err) {
        console.error("SMTP Email Error >>>", err);
        throw new Error("Email sending failed");
    }
}

module.exports = sendEmail;
