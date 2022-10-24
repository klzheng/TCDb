const express = require("express");
// destructuring of modules 
const { create, forgetPassword, sendResetPasswordTokenStatus, resetPassword,
  signIn } = require("../controllers/user");
const { isAuth, Auth } = require("../middlewares/auth");
const { isValidPassResetToken } = require("../middlewares/user");
const { userValidator, validate, validatePassword, signInValidator} = require("../middlewares/validator");

// routes
const router = express.Router();

router.post("/create", userValidator, validate, create);
router.post("/sign-in", signInValidator, validate, signIn);
router.post("/forget-password", forgetPassword);
router.post("/verify-pass-reset-token", isValidPassResetToken, sendResetPasswordTokenStatus);
router.post("/reset-password", validatePassword, validate, isValidPassResetToken, resetPassword);
router.get("/is-auth", isAuth, Auth);

module.exports = router;
