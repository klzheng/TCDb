const express = require("express")
const { addReview, updateReview, deleteReview } = require("../controllers/review")
const { isAuth } = require("../middlewares/auth")
const { validateRatings } = require("../middlewares/validator")
const { validate } = require("../middlewares/validator")
const router = express.Router()

router.post("/add/:mediaType/:id", isAuth, validateRatings, validate, addReview)
router.patch("/:reviewId", isAuth, validateRatings, validate, updateReview)
router.delete("/:reviewId", isAuth, deleteReview)



module.exports = router