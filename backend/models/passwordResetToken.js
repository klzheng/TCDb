const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// password token structure
const passwordResetTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now(),
    },
});

// Hashes the token before saving
passwordResetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});

// method that compares the tokens
passwordResetTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

// exports the token model as "PasswordResetToken"
module.exports = mongoose.model(
    "PasswordResetToken",
    passwordResetTokenSchema
);