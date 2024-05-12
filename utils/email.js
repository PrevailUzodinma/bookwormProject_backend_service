const nodemailer = require('nodemailer');

const sendEmail = async (option) => {
    // Create a Transporter: the service that will send the email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "vailchris25@gmail.com",
          pass: 'cotmfsxphxrfahdh'
        }
      });

      // Define Email options
      const emailOptions = {
        from: "Bookworm Support<support@bookworm.com>",
        to: option.email,
        subject: option.subject,
        text: option.message
      }

      await transporter.sendMail(emailOptions)
    
}

module.exports = sendEmail;