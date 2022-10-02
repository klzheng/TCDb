const mongoose = require('mongoose');

// using mongoose to connect to db
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('db is connected!')
    })
    .catch((ex) => {
        console.log('db connection failed: ', ex)
    })