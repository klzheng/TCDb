const { isValidObjectId } = require("mongoose")
const Review = require("../models/review")
const { sendError } = require("../utils/helper")


exports.addReview = async (req, res) => {
    const { mediaType, id } = req.params
    const { content, rating, liked, imgPath } = req.body
    const userId = req.user._id

    // validation
    const alreadyReviewed = await Review.findOne({ owner: userId, movieId: id, movieType: mediaType })
    if (alreadyReviewed) return sendError(res, "Movie is already reviewed")

    // create review
    const newReview = new Review({
        owner: userId,
        movieType: mediaType,
        movieId: id,
        imgPath: imgPath,
        content: content,
        rating: rating,
        liked: liked,
    })

    // saving review
    await newReview.save()

    res.json({ message: "Review added" })
}


exports.updateReview = async (req, res) => {
    console.log(req.params)
    const { reviewId } = req.params
    const { content, rating, liked, imgPath } = req.body
    const userId = req.user._id

    // validation
    if (!isValidObjectId(reviewId)) return sendError(res, "Invalid review ID")

    const review = await Review.findOne({ owner: userId, _id: reviewId })
    if (!review) return sendError(res, "Review not found, failed to update")

    // updating content, rating, and like
    review.content = content
    review.rating = rating
    review.liked = liked
    review.imgPath = imgPath

    await review.save()

    res.json({ message: "Review updated" })
}


exports.deleteReview = async (req, res) => {
    const { reviewId } = req.params
    const userId = req.user._id

    if (!isValidObjectId(reviewId)) return sendError(res, "Invalid review ID")

    const review = Review.findOne({ owner: userId, _id: reviewId })
    if (!review) return sendError(res, "Review not found, failed to delete ")

    await Review.findByIdAndDelete(reviewId)

    res.json({ message: "Successfully deleted review" })
}


exports.getReview = async (req, res) => {
    const { mediaType, id } = req.params
    const userId = req.user._id

    Review.findOne({ owner: userId, movieType: mediaType, movieId: id }, (err, response) => {
        if (err) return sendError(res, "Review not found")
        res.json({response})
    })

}

exports.getAll = async ( req, res ) => {
    const userId = req.user._id

    Review.find({ owner: userId}, (err, response) => {
        if (err) return sendError(res, "Reviews could not be retrieved")
        res.json({response})
    })
}