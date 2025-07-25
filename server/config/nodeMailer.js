// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//   host: 'smtp-relay.brevo.com',
//   port: 587,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS
//   }
// })



// transporter
//   .verify()
//   .then(() => console.log('SMTP connection OK'))
//   .catch(err => console.error('SMTP error:', err))

// const testMailOptions = {
//   from: 'vishal070699@gmail.com', // Use a domain you've verified in Brevo
//   to: 'vmahale799@gmail.com', // Your personal email for testing
//   subject: 'Test Booking Confirmation',
//   html: '<p>This is a test email from your booking system.</p>'
// }
// const testEmailResult = await transporter.sendMail(testMailOptions)
// console.log('Test email result:', testEmailResult)

// export default transporter



// utils/sendEmail.js
import nodemailer from 'nodemailer'

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or use SMTP config
    auth: {
      user: process.env.EMAIL_USER, // your Gmail or SMTP username
      pass: process.env.EMAIL_PASS  // your Gmail or SMTP password or App password
    }
  })

  console.log(EMAIL_PASS,EMAIL_PASS);
  console.log("This is a nodemailer fucntion");
  

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  }

  await transporter.sendMail(mailOptions)
}
