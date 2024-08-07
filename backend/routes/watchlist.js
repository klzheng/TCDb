const express = require("express")
const { addWatchlist, getWatchlistItem, removeWatchlist, getWatchlist } = require("../controllers/watchlist")
const {isAuth} = require("../middlewares/auth")
const {validate} = require("../middlewares/validator")
const router = express.Router()


router.get("/get/:mediaType/:id", isAuth, getWatchlistItem)
router.get("/get/watchlist", isAuth, getWatchlist)
router.post("/add/:mediaType/:id", isAuth, validate, addWatchlist)
router.delete("/delete/:watchlistId", isAuth, removeWatchlist)


module.exports = router