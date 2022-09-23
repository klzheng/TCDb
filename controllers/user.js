const nodemailer = require("nodemailer")
const User = require("../models/user")
const EmailToken = require("../models/emailToken")
const { isValidObjectId } = require("mongoose")



exports.create = async (req, res) => {
    const {name, email, password} = req.body
    const oldUser = await User.findOne({email})

    if (oldUser) {
        return res.status(401).json({ error: "This email is already in use"})
    } 
    const newUser = new User({
        name: name,
        email: email,
        password: password
    })
    await newUser.save()

    // generate 6 digit OTP
    let OTP = ""
    for (let i = 0; i < 6; i++) {
        const randVal = Math.floor(Math.random()*10)
        OTP += randVal
    }

    // store OTP inside our db
    const newEmailToken = new EmailToken({
        owner: newUser._id, 
        token: OTP,
    })

    await newEmailToken.save()

    // send OTP to user
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b40f2d615821f6",
          pass: "b7d7f1ec96770e"
        }
      });

    // Sending the email with OTP info
    transport.sendMail({
        from: "verification@reviewapp.com",
        to: newUser.email,
        subject: "Email Verification",
        html:  
            `
            <p> Your verification OTP </p>
            <h1>${OTP}</h1>
            `
    })

    // 201 response with message
    res.status(201).json({ message: "Please verify your email. OTP has been sent to your email account"})
}

exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body
    const user = await User.findById(userId)
    const token = await EmailToken.findOne({ owner: userId })
    const isMatched = await token.compareToken(OTP)

    if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" })
    if (!user) return res.json({ error: "user not found!" })
    if (user.isVerified) return res.json({ error: "user is already verified!" })
    if (!token) return res.json({ error: 'token not found!' })
    if (!isMatched) return res.json({ error: 'Please submit a valid OTP!' })
  
    user.isVerified = true;
    await user.save();
    await EmailToken.findByIdAndDelete(token._id);
  
    let transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b40f2d615821f6",
        pass: "b7d7f1ec96770e"
      }
    });
  
    transport.sendMail({
      from: 'verification@reviewapp.com',
      to: user.email,
      subject: 'Welcome Email',
      html: '<h1>Welcome to our app and thanks for choosing us.</h1>'
    })
  
    res.json({ message: "Your email is verified." })
}

// exports.verifyEmail = async (req, res) => {
//     const { userId, OTP } = req.body
//     const user = await User.findById(userId)
//     const token = await EmailToken.findOne({ owner : userId })
//     const isMatched = await token.compareToken(OTP)

//     if (!isValidObjectId(userId)) {
//         return res.json({error: "Invalid user"})
//     } else if (!user) {
//         return res.json({ error: "user not found!" })
//     } else if (user.isVerified) {
//         return res.json({ error: "user is already verified!"})
//     } else if (!token) {
//         return res.json({ error: "token not found" })
//     } else if (!isMatched) {
//         return res.json({ error: "Please submit a valid OTP"})
//     } else {
//         user.isVerified = true
//         await user.save()

//         await EmailToken.findByIdAndDelete(token._id)

//         var transport = nodemailer.createTransport({
//             host: "smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//               user: "b40f2d615821f6",
//               pass: "b7d7f1ec96770e"
//             }
//           });
    
//         // Sending the email with OTP info
//         transport.sendMail({
//             from: "verification@reviewapp.com",
//             to: user.email,
//             subject: "Email verified!",
//             html:  
//                 `
//                 <p> Your email has been verified! </p>
//                 `
//         })
    
//         res.json({message: "Your email has been verified"})
//     }
// }


