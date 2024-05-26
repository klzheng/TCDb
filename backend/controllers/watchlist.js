const { isValidObjectId } = require("mongoose")
const Watchlist = require("../db/models/watchList")
const {sendError, errors} = require("../utils/error")
const { errorHandler } = require("../middlewares/errorHandler")

exports.addWatchlist = async ( req, res ) => {
    const {mediaType, id} = req.params
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

    await newWatchlist.save()

    res.json({ message: "Added to watchlist"})
}


exports.getWatchlistItem = async ( req, res ) => {
    const {mediaType, id} = req.params
    const userId = req.user._id

    Watchlist.findOne({
        owner: userId,
        movieId: id,
        movieType: mediaType
    }).then((item) => {
        if (!item) {
            return res.status(404).json({ message: errors.RESOURCE_NOT_FOUND});
        }
        return res.json(item)
    }).catch((err) => {
        return errorHandler(err, req, res)
    })
}


exports.removeWatchlist = async (req, res) => {
    const {watchlistId} = req.params
    const userId = req.user._id

    if (!isValidObjectId(watchlistId)) return sendError(res, "Invalid watchlist ID")

    const watchlistItem = await Watchlist.findOne({ owner: userId, _id: watchlistId })
    if (!watchlistItem) return sendError(res, "Item not found in watchlist, failed to delete ")

    await Watchlist.findByIdAndDelete(watchlistId)

    res.json({ message: "Removed from watchlist" })
}


exports.getWatchlist = async (req, res) => {
    const userId = req.user._id

    const response = await Watchlist
        .find({ owner: userId})

    res.json(response)
}
