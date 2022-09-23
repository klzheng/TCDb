const nodemailer = require("nodemailer")

// generates new OTP with default length 6
exports.generateOTP = (otpLength = 6) => {
    let OTP = ""
    for (let i = 0; i < otpLength; i++) {
        const randVal = Math.floor(Math.random()*10)
        OTP += randVal
    }
    return OTP
}

// generates nodemailer transporter
exports.generateTransporter = () => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b40f2d615821f6",
          pass: "b7d7f1ec96770e"
        }
    });
    return transport
}

