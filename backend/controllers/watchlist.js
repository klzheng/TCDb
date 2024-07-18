const { isValidObjectId } = require("mongoose")
const Watchlist = require("../db/models/watchList")
const { sendError } = require("../utils/error")
const { errorHandler } = require("../middlewares/errorHandler")

exports.addWatchlist = async (req, res) => {
    const { mediaType, id } = req.params
    const { imgPath, releaseDate, movieName } = req.body
    const userId = req.user._id

    const alreadySaved = await Watchlist.findOne({ owner: userId, movieId: id, movieType: mediaType })
    if (alreadySaved) return sendError(res, "This film has already been added to watchlist")

    const newWatchlist = new Watchlist({
        owner: userId,
        movieType: mediaType,
        movieId: id,
        movieName: movieName,
        imgPath: imgPath,
        movieRelease: releaseDate,
    })

    newWatchlist
        .save()
        .then((watchlistItem) => { 
            return res.status(200).json({ 
                data: watchlistItem,
                message: "Added to watchlist!",
            })
        })
        .catch((err) => {
            return errorHandler(err, req, res)
        })
}



exports.getWatchlistItem = async ( req, res ) => {
    const {mediaType, id} = req.params
    const userId = req.user._id

    Watchlist.findOne({
        owner: userId,
        movieId: id,
        movieType: mediaType
    }).then((item) => {
        if (item) {
            return res.status(200).json(item)
        }
    }).catch((err) => {
        return errorHandler(err, req, res)
    })
}


exports.removeWatchlist = async (req, res) => {
    const {watchlistId} = req.params
    const userId = req.user._id

    if (!isValidObjectId(watchlistId)) return sendError(res, "Invalid watchlist ID")

    Watchlist
        .findOneAndDelete({ _id: watchlistId, owner: userId })
        .then((result) => {
            if (!result) {
                return sendError(res, "Watchlist item not found")
            }
            return res.status(200).json({
                message: "Removed!"
            })
        })
        .catch((err) => errorHandler(err, req, res))
}


exports.getWatchlist = async (req, res) => {
    const userId = req.user._id

    const userWatchlist = await Watchlist
        .find({ owner: userId})

    return res.status(200).json(userWatchlist)
}
