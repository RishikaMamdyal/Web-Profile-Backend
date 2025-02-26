const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: false, message: 'Method Not Allowed' });
  }

  const { fullName, emailTo, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rishikamamdyal@gmail.com', // From Vercel env variables
        pass: "zqqt ccrz tgtf czyh",
      },
    });

    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${emailTo}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>
    `;

    const mailOptions = {
      from: emailTo,
      to: process.env.EMAIL_USER,
      subject: `New Message from ${fullName} Regarding: ${subject}`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ status: true, message: '📧 Email sent successfully!' });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).json({ status: false, message: 'Failed to send email.' });
  }
}
