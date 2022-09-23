const {check, validationResult} = require("express-validator")
const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");

// validates name, email, and password before creating user
exports.userValidator = [
    check("name").trim().not().isEmpty().withMessage("Name is missing!"),
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid!"),
    check("password").trim().not().isEmpty().withMessage("Password is missing").isLength({min: 8, max: 20}).withMessage("Password must be between 8-20 characters")
]

// returns error message(s). Only proceeds when there are no errors
exports.validationRes = (req, res, next) => {
    const error = validationResult(req).array()
    if (error.length) {
        return res.json({error: error[0].msg})
    }

    next()
}

// validates password input
exports.validatePassword = [
    check("newPassword")
        .trim().not().isEmpty().withMessage("Password cannot be empty")
        .isLength({ min: 8, max: 20}).withMessage("Password must be 8-20 characters long")
]

// checks password reset token
exports.validateResetToken = async (req, res, next) => {
    const { token, userId } = req.body;
    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    const matched = await resetToken.compareToken(token);

    // various error responses
    if (!token.trim() || !isValidObjectId(userId)) return res.json({error: "Invalid request"})
    if (!resetToken) return res.json({error: "Unauthorized access, invalid request"})
    if (!matched) return res.json({error: "Unauthorized access, invalid request"}) 
    req.resetToken = resetToken;

    next();
};

// checks email and password for sign in
exports.validateSignIn = [
    check("email").normalizeEmail().isEmail().withMessage("Email is invalid"),
    check("password")
        .trim().not().isEmpty().withMessage("Password cannot be empty")
]