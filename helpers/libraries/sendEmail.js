const nodemailer = require("nodemailer")

const sendEmail = async(mailOptions) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });


      let info = await transporter.sendMail(mailOptions);

      console.log("Message Sent: "+info.messageId)
}


module.exports = sendEmail;