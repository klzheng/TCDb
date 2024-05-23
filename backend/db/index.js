const mongoose = require('mongoose');

const user = encodeURIComponent(process.env.MONGO_DB_USERNAME)
const pass = encodeURIComponent(process.env.MONGO_DB_PASSWORD)
const uri = `mongodb+srv://${user}:${pass}@cluster0.jlt0rwv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// using mongoose to connect to db
mongoose
    .connect(uri)
    .then(() => {
        console.log('db is connected!')
    })
    .catch((ex) => {
        console.log('db connection failed: ', ex)
    })