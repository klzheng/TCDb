const express = require("express")
const { create, verifyEmail, resendEmailToken, forgetPassword, resetPassword, signIn } = require("../controllers/user")
const {userValidator, validationRes, validatePassword, validateResetToken, validateSignIn} = require("../middleware/validator")
const router = express.Router()


router.post("/create", userValidator, validationRes, create)
router.post("/verify-email", verifyEmail)
router.post("/resend-email-token", resendEmailToken)
router.post("/forget-password", forgetPassword)
router.post("/reset-password", validatePassword, validationRes, validateResetToken, resetPassword)
router.post("/sign-in", validateSignIn, validationRes, signIn)


module.exports = router