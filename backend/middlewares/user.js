const { isValidObjectId } = require("mongoose");
const PasswordResetToken = require("../models/passwordResetToken");
const { sendError } = require("../utils/helper");

// Middleware that checks if password token is valid
exports.isValidPassResetToken = async (req, res, next) => {
    const { token, userId } = req.body;

    // checks if token/userId exists
    if (!isValidObjectId(userId) || !token.trim())
        return sendError(res, "Invalid request");

    // checks db for userId
    const resetToken = await PasswordResetToken.findOne({ owner: userId });
    if (!resetToken)
        return sendError(res, "Unauthorized access, invalid request");

    // checks if the token matches the token value in db
    const matched = await resetToken.compareToken(token);
    if (!matched) return sendError(res, "Unauthorized access, invalid request");

    req.resetToken = resetToken;
    next();
};