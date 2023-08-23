const nodemailer = require("nodemailer");


const verifyemail = async (newUser) => {
    const transporter = nodemailer.createTransport({
       host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
auth: {
 user: process.env.EMAIL_USERNAME,
pass: process.env.EMAIL_PASSWORD,
},
});
   

    const options = {
        
        from: process.env.EMAIL_USERNAME,
        to: newUser.email,
        subject: "email varification for Contact website",
        text: "this is a test message",
        html: `
        <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1><br><br>
         <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with the online Contacts, you can safely delete this email.</p><br><br>
          <a href="http://localhost:3000/api/auth/verify/${newUser.verificationToken}" target="_blank" style="background-color: blue;display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Varify Email</a>
        <br><br>
        <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:  </p>
         <p style="margin: 0;"><a href="http://localhost:3000/api/auth/verify/${newUser.verificationToken}" target="_blank">http://localhost:3000/api/auth/verify/${newUser.verificationToken}</a></p>
        `
    }
    transporter.sendMail(options,  function (err, info) {
        if (err) {
            console.log(err)
            return
        }
        console.log("sent" + info.response)
    })
}

module.exports = verifyemail;