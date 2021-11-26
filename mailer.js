require('dotenv').config()

const nodemailer = require('nodemailer');

module.exports.sendEmail = async (to, message) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Family Gift Exchange" <family-gift-exchange@mail.com>', // sender address
    to: to, // list of receivers
    subject: '2021 Family Gift Exchange',
    text: message, // plain text body
    html: `<b>${message}</b>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
}