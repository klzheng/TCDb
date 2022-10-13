const cloudinary = require('cloudinary').v2
const Actor = ('../models/actor')

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

exports.createActor = async (req, res) => {
    const {name, about} = req.body
    const {file} = req

    const newActor = new Actor({name, about})
    await cloudinary.uploader.upload("/home")
}