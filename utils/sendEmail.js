const nodemailer = require("nodemailer");

async function sendEmail(to, otp){
    try{
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: "Your Wanderlust OTP Verification Code",
            html: `
                <h2>Wanderlust Email Verification</h2>
                <p>Your OTP is:</p>
                <h1 style="letter-spacing:5px">${otp}</h1>
                <p>This OTP will expire in 5 minutes.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;

    } catch(err){
        console.error("Email Error:", err);
        return false;
    }
}

module.exports = sendEmail;
