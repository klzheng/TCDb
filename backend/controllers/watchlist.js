const { isValidObjectId } = require("mongoose")
const Watchlist = require("../models/watchList")
const {sendError} = require("../utils/helper")

exports.addWatchlist = async ( req, res ) => {
    const {mediaType, id} = req.params
    const {movieName} = req.body
    const userId = req.user._id
    

    const alreadySaved = await Watchlist.findOne({ owner: userId, movieId: id, movieType: mediaType })
    if (alreadySaved) return sendError(res, "This film has already been added to watchlist")

    const newWatchlist = new Watchlist({
        owner: userId,
        movieType: mediaType,
        movieId: id,
        movieName: movieName,
    })

    await newWatchlist.save()

    res.json({ message: "Added to watchlist"})
}


exports.getWatchlistItem = async ( req, res ) => {
    const {mediaType, id} = req.params
    const userId = req.user._id

    const alreadySaved = await Watchlist.findOne({ owner: userId, movieId: id, movieType: mediaType })
    if (!alreadySaved) return sendError(res, "Item not found on watchlist")

    res.json({response: alreadySaved})
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


