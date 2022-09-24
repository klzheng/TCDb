const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// creating the structure of the password token
const passwordTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
    }
})

// hashes the token before saving
passwordTokenSchema.pre("save", async function(next) {
    if (this.isModified('token')) {
        this.token = await bcrypt.hash(this.token, 10)
    }

    next()
})

// Compares the inputted token with the stored token in db
passwordTokenSchema.methods.compareToken = async function(token) {
    const result = await bcrypt.compare(token, this.token)
    return result
}


module.exports = mongoose.model("PasswordToken", passwordTokenSchema)