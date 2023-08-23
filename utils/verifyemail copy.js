const nodemailer = require("nodemailer");


const verifyemail = async (newUser) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVICE,
        port: 587,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USERNAME, // sender address
            to: "jimlynch268@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
}

module.exports = verifyemail;