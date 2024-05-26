const nodemailer = require('nodemailer')

// Mailer
exports.generateMailTransporter = () =>
    nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: 'OAuth2',
            user: process.env.TCDB_MAIL_USER,
            pass: process.env.TCDB_MAIL_APP_PASS,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        }
    })