const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const server = express();
server.use(cors());
server.use(bodyParser.json());

server.post('/contact', async (req, res) => {
  const { fullName, emailTo, reason, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
                user: 'rishikamamdyal@gmail.com',
                pass: "zqqt ccrz tgtf czyh", 
              },
    });

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${emailTo}</p>
        <p><strong>Subject:</strong> ${reason}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;

    const mailOptions = {
      from: emailTo,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${fullName} Regarding: ${reason}`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send({ status: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ status: false, message: 'Failed to send email.' });
  }
});

// ✅ Required: Export the handler for Vercel serverless function
module.exports = server;
