import nodemailer from 'nodemailer';

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  html?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  // Create reusable transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Setup email data
  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Kuruva Mess House" <noreply@kuruvamesshouse.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message
  };

  // Send mail with defined transport object
  const info = await transporter.sendMail(mailOptions);

  console.log('Message sent: %s', info.messageId);
  return info;
};
