const express = require("express")
const { addReview, updateReview, deleteReview, getReview, getAll, getSorted } = require("../controllers/review")
const { isAuth } = require("../middlewares/auth")
const { validateRatings } = require("../middlewares/validator")
const { validate } = require("../middlewares/validator")
const router = express.Router()

router.get("/get/:mediaType/:id", isAuth, getReview)
router.get("/get/my-films/", isAuth, getAll)
router.get("/get/sort/:filterTerm/:filterValue", isAuth, getSorted)
router.post("/add/:mediaType/:id", isAuth, validateRatings, validate, addReview)
router.patch("/patch/:reviewId", isAuth, validateRatings, validate, updateReview)
router.delete("/delete/:reviewId", isAuth, deleteReview)


module.exports = router