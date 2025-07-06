const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or smtp config
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail
    pass: process.env.EMAIL_PASS, // App password if using Gmail
  },
});

async function sendNotification(to) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Appointment has been booked",
    html: `<p>Thankyou </p>`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendNotification };
