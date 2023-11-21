const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendEmail = (to, subject, html) => {
  transporter.sendMail({
    from: '"A Company" <imoguz0510@gmail.com>',
    to: to,
    subject: subject,
    html: html,
  });
};

module.exports = sendEmail;
