const express = require("express")
const { create, verifyEmail } = require("../controllers/user")
const {userValidator, validate} = require("../middleware/validator")
const router = express.Router()

router.post("/create", userValidator, validate, create)
router.post("/verify-email", verifyEmail)

module.exports = router