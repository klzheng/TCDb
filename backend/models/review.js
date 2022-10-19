const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema(
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
        content: {
            type: String,
            trim: true,
        },
        rating: {
            type: Number,
            required: true
        },
        liked: {
            type: Boolean,
            required: true
        }
        
    },
    { 
        timestamps: true 
    },
)

module.exports = mongoose.model("Review", reviewSchema)