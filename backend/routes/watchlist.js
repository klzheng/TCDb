const express = require("express")
const { addWatchlist, getWatchlistItem, removeWatchlist } = require("../controllers/watchlist")
const {isAuth} = require("../middlewares/auth")
const {validate} = require("../middlewares/validator")
const router = express.Router()


// router.get("/get/watchlist", isAuth, getAll)
router.get("/get/:mediaType/:id", isAuth, getWatchlistItem)
router.post("/add/:mediaType/:id", isAuth, validate, addWatchlist)
router.delete("/delete/:watchlistId", isAuth, removeWatchlist)


module.exports = router