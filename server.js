// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // To handle CORS
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Function to send a thank you email
async function sendThankYouEmail(recipientEmail, recipientName) {
  const emailHTML = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thank You Email</title>
    <style>
      body {
        font-family: 'Poppins', sans-serif;
        padding: 0;
        margin: 0;
        background-color: #f9f4ef;
        color: #333;
      }
      .container {
        width: 100%;
        background-color: #f9f4ef;
        padding: 20px;
      }
      .content {
        max-width: 600px;
        background-color: #ffffff;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        margin: 0 auto;
      }
      .header img {
        width: 80px;
        vertical-align: middle;
      }
      .title {
        text-align: center;
        padding: 20px;
      }
      .title h1 {
        font-family: 'Great Vibes', cursive;
        font-size: 48px;
        color: #333;
      }
      .title p {
        font-family: 'Playfair Display', serif;
        font-size: 20px;
        color: #777;
        font-weight: 500;
        letter-spacing: 1px;
      }
      .message {
        font-size: 16px;
        line-height: 1.8;
        color: #555;
        text-align: center;
      }
      .contact-info a {
        color: #0066cc;
        text-decoration: none;
        font-weight: bold;
      }
      a{
        text-decoration:none;
      }
      .social-media {
        padding: 20px 0;
        text-align: center;
      }
      .social-media img {
        width: 30px;
        margin: 0 10px;
      }

      /* Responsive Design */
      @media (max-width: 600px) {
        .content {
          padding: 15px;
        }
        .title h1 {
          font-size: 36px;
        }
        .title p {
          font-size: 18px;
        }
      }
    </style>
  </head>
  <body>
    <table class="container" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table class="content" cellpadding="0" cellspacing="0">
            <tr class="header">
              <td align="left">
                <img
                  src="https://dl.dropboxusercontent.com/scl/fi/muhofnwtfub9y6lg518ng/download-removebg-preview.png?rlkey=qqd1cngqd8xjybzclbvo1q0zh&st=f1d2eemm&dl=0"
                  alt="Vishnu Universal Learning"
                />
              </td>
              <td align="right">
                <img
                  src="https://dl.dropboxusercontent.com/scl/fi/cio7w143fxprelb1hjsph/logo.png?rlkey=noslm6rt05p1328guepru4erg&st=ilm9yv1r&dl=0"
                  alt="E-Cell Vishnu Institute of Technology"
                />
              </td>
            </tr>
            <tr class="title">
              <td colspan="2">
                <h1>Thank You</h1>
                <p>FOR YOUR INTEREST</p>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="message">
                <p>Dear ${recipientName},</p>
                <p>
                  Thank you for filling out the form! We’ve successfully received your response and are thrilled about
                  your interest in collaborating with us.
                </p>
                <p>
                  <strong>What’s Next?</strong><br />
                  Our team is reviewing your submission, and we’ll get back to
                  you shortly with further instructions and next steps. Keep an
                  eye on your email for updates!
                </p>
                <p>
                  If you have any questions, feel free to reach out at<br />
                  <a href="mailto:e-cell@vishnu.edu.in" class="contact-info">E-cell@vishnu.edu.in</a> or call us at
                  <a href="tel:+919490538442" class="contact-info">+91 94905 38442</a>.
                </p>
              </td>
            </tr>
            <tr class="social-media">
              <td colspan="2">
                <h2>Contact Us</h2>
                <a href="https://www.instagram.com/ecell_vitb" target="_blank">
                  <img
                    src="https://cdn.glitch.global/ba2934e1-1535-438d-b763-f730b1c24821/5296765_camera_instagram_instagram%20logo_icon.png?v=1729881703517"
                    alt="Instagram"
                  />
                </a>
                <a href="https://www.linkedin.com/company/ecellvitb" target="_blank">
                  <img
                    src="https://cdn.glitch.global/ba2934e1-1535-438d-b763-f730b1c24821/825645_linkedin_logo_social%20network_icon.png?v=1729881932896"
                    alt="LinkedIn"
                  />
                </a>
                <a href="mailto:e-cell@vishnu.edu.in">
                  <img
                    src="https://cdn.glitch.global/ba2934e1-1535-438d-b763-f730b1c24821/communication.png?v=1729882110199"
                    alt="Email"
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"E-Cell" <your-email@gmail.com>',
      to: recipientEmail,
      subject: "Thank You for Registering!",
      html: emailHTML,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

// Endpoint to send email
app.post("/api/send-email", async (req, res) => {
  const { name, email } = req.body;
  try {
    await sendThankYouEmail(email, name);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send("Error sending email");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
