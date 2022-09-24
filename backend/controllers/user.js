const jwt = require("jsonwebtoken")
const { isValidObjectId } = require("mongoose")
const { generateOTP, generateTransporter } = require("../utils/mail")
const User = require("../models/user")
const EmailToken = require("../models/emailToken")
const PasswordToken = require("../models/passwordResetToken")


// creates new user, saves it in db, and sends OTP to email
exports.create = async (req, res) => {
    const {name, email, password} = req.body
    const oldUser = await User.findOne({email})

    // checks if email is already in db
    if (oldUser) {
        return res.json({ error: "This email is already in use"})
    } 

    // create new user object
    const newUser = new User({
        name: name,
        email: email,
        password: password
    })

    // save new user to db
    await newUser.save()

    // generate 6 digit OTP
    const OTP = generateOTP()

    // creates new token object
    const newEmailToken = new EmailToken({
        owner: newUser._id, 
        token: OTP,
    })

    // saves OTP (token object) inside our db
    await newEmailToken.save()

    // gets mail transporter
    const transport = generateTransporter()

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
    res.json({ message: "Please verify your email. OTP has been sent to your email account"})
}


// checks OTP input against OTP in db and verifies user
exports.verifyEmail = async (req, res) => {
    const { userId, OTP } = req.body
    const user = await User.findById(userId)
    const token = await EmailToken.findOne({ owner: userId })
    const isMatched = await token.compareToken(OTP)

    // checks for errors
    if (!isValidObjectId(userId)) return res.json({ error: "Invalid user!" })
    if (!user) return res.json({ error: "user not found!" })
    if (user.isVerified) return res.json({ error: "user is already verified!" })
    if (!token) return res.json({ error: 'token not found!' })
    if (!isMatched) return res.json({ error: 'Please submit a valid OTP!' })
  
    // if no errors, change user verified status to true
    user.isVerified = true;
    await user.save();
    await EmailToken.findByIdAndDelete(token._id);
  
    const transport = generateTransporter()
  
    transport.sendMail({
      from: 'verification@reviewapp.com',
      to: user.email,
      subject: 'Welcome Email',
      html: '<h1>Welcome to our app!.</h1>'
    })
  
    res.json({ message: "Your email is verified." })
}


// resends OTP to user email 
exports.resendEmailToken = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  const token = await EmailToken.findOne({
    owner: userId,
  });

  if (!user) return res.json({ error: "user not found!" });
  if (user.isVerified) return res.json({ error: "This email id is already verified!" });
  if (token) return res.json({ error: "Please wait 1 hour before requesting a new token" });

  // generate 6 digit OTP
  const OTP = generateOTP()

  // creates new token
  const newEmailToken = new EmailToken({ owner: user._id, token: OTP })

  // saves token into db
  await newEmailToken.save()

  // use nodemailer
  const transport = generateTransporter()

  // send OTP to email
  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Email Verification',
    html: `
      <p>Your verification OTP</p>
      <h1>${OTP}</h1>
    `
  })

  // response message
  res.json({
    message: "New OTP has been sent to your email",
  });
};


// sends reset password link to user email
exports.forgetPassword = async (req, res) => {
  const {email} = req.body
  const user = await User.findOne({email})
  const token = await PasswordToken.findOne({owner: user._id})

  if (!email) return res.json({error: "email is missing"})
  if (!user) return res.json({error: "User not found"})
  if (token) return res.json({error: "Please wait 1 hour before requesting for a new password token"})

  // generates OTP code
  const OTP = generateOTP()

  // creates new password token object
  const newPasswordToken = new PasswordToken({ owner: user._id, token: OTP })

  // saves token object to db
  await newPasswordToken.save()

  // creates password reset link
  const resetPassUrl = `http://localhost:3000/reset-password?token=${OTP}&id=${user._id}`

  // sends password reset link to user email
  const transport = generateTransporter()
  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Reset Password Link",
    html: `
      <p>Click <a href='${resetPassUrl}'>here</a> to reset password</p>
    `,
  });

  res.json({ message: "Link sent to your email!" });
}


// resets password
exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;
  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);

  // checks if new password === old password
  if (matched) return res.json({error: "The new password must be different from the old one"})

  // sets user password to new password
  user.password = newPassword;

  // saves and updates the user info in db
  await user.save();

  // deletes password token
  await PasswordToken.findByIdAndDelete(req.resetToken._id);

  const transport = generateTransporter();
  transport.sendMail({
    from: "security@reviewapp.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
      <h1>Password Reset Successfully</h1>
    `,
  });

  res.json({
    message: "Password reset successfully.",
  })
}


// user sign-in
exports.signIn = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})
  const matched = await user.comparePassword(password)
  const jwtToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: "30d"}) // uses json web token to ...

  if (!user) return res.json({error: "Email/Password incorrect. Please try again"})
  if (!matched) return res.json({error: "Email/Password incorrect. Please try again"})

  res.json({
    user: {
      id: user._id, 
      name: user.name, 
      email: user.email, 
      token: jwtToken
    }
  })
}