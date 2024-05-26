const mongoose = require("mongoose")

const watchListSchema = mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        movieType: {
            type: String,
            required: true
        },
        movieId: {
            type: Number,
            required: true
        },
        movieName: {
            type: String,
            required: true
        },
        movieRelease: {
            type: String,
            required: true
        },
        imgPath: {
            type: String,
        },
    },
    { 
        timestamps: true 
    },
)

module.exports = mongoose.model("Watchlist", watchListSchema)