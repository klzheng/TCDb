const mongoose = require('mongoose')

// user document structure
const actorSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    about: {
        type: String,
        trim: true,
        required: true,
    },
    avatar: {
        type: Object,
        url: String,
        public_id: String
    },
}, {timestamps: time})


// exports as "Actor"
module.exports = mongoose.model('Actor', uploadImage.single('avatar'),actorSchema)

