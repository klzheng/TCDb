const jwt = require("jsonwebtoken");
const User = require("../db/models/user");
const { generateMailTransporter } = require("../utils/mailer");
const { generateRandomByte } = require("../utils/helper");
const sendError = require("../utils/error")
const PasswordResetToken = require("../db/models/passwordResetToken");


// creates new user, saves it to db
exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const oldUser = await User.findOne({ email });

  // checks if email is already in db
  if (oldUser) return sendError(res, "Sorry, this email is already in use");

  // creates new user with req info and saves in db
  const newUser = new User({ name, email, password });
  await newUser.save();

  // response back to client
  res.status(201).json({
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};


// checks if email exists, and sends password reset link if it does
exports.forgetPassword = async (req, res) => {
  // grabbing email, checking it has value
  const { email } = req.body;
  if (!email) return sendError(res, "Email is missing");

  // check if email exists in db
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "User not found", 404);

  // generates reset token and saves to db
  const token = await generateRandomByte();
  const newPasswordResetToken = await PasswordResetToken({
    owner: user._id,
    token,
  });
  await newPasswordResetToken.save();

  // create reset link
  const resetPasswordUrl = `http://localhost:3000/auth/reset-password?token=${token}&id=${user._id}`;

  // password reset mail
  const transport = generateMailTransporter();
  transport.sendMail({
    from: process.env.TCDB_MAIL_USER,
    to: user.email,
    subject: "Reset Password Link",
    html: `
      <p>Click here to reset password</p>
      <a href='${resetPasswordUrl}'>Change Password</a>
      <p>Link expires in 1 hour</p>
    `,
  }, (err, data) => {
    if (err) {
      console.log("Error " + err)
    } else {
      console.log("Email sent successfully")
    }
  });

  res.json({ message: "Password reset link has been sent to your email" });
};


// After password token has been verified, send res
exports.sendResetPasswordTokenStatus = (req, res) => {
  res.json({ valid: true });
};


// resets password
exports.resetPassword = async (req, res) => {
  const { newPassword, userId } = req.body;
  const user = await User.findById(userId);
  const matched = await user.comparePassword(newPassword);
  // check if new password === old pass
  if (matched)
    return sendError(
      res,
      "The new password must be different from the old one"
    );
  // sets new pass and saves to db
  user.password = newPassword;
  await user.save();
  // deletes reset token from db
  await PasswordResetToken.findByIdAndDelete(req.resetToken._id);

  // sends email notifying password change
  const transport = generateMailTransporter();
  transport.sendMail({
    from: "thecinemadb@gmail.com",
    to: user.email,
    subject: "Password Reset Successfully",
    html: `
      <h1>Password Reset Successfully</h1>
    `,
  });
  
  // response
  res.json({
    message: "Password reset successfully",
  });
};


// Signs in user
exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  // checks if email exists
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email and password do not match");
  // checks if password matches
  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email and password do not match");

  // uses jwt to log in 
  const { _id, name} = user;
  const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);

  res.json({
    user: { id: _id, name, email, token: jwtToken},
  });
};
