const nodemailer = require("nodemailer");

async function sendEmail(to, otp) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_LOGIN,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject: "Wanderlust Email Verification OTP",
            html: `
                <h2>Your OTP</h2>
                <h1>${otp}</h1>
                <p>This OTP expires in 5 minutes.</p>
            `,
        });

        console.log("Brevo SMTP Email sent successfully!");

    } catch (error) {
        console.error("Brevo SMTP Error:", error);
        throw new Error("Email sending failed");
    }
}

module.exports = sendEmail;
