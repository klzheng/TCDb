
const express = require("express"); // express 
const app = express(); // convention 
const morgan = require("morgan"); // db logger
const cors = require("cors"); 
const { errorHandler, errorNotFound } = require("./middlewares/errorHandler");
const userRouter = require("./routes/user");
const reviewRouter = require("./routes/review");
const watchlistRouter = require("./routes/watchlist");


require("express-async-errors"); // error handling when using async functions
require("dotenv").config(); // .env
require("./db"); // connects to mongo db

app.use(cors());
app.use(express.json()); // parses json
app.use(morgan("dev")); 
app.use("/api/user", userRouter);
app.use("/api/review", reviewRouter);
app.use("/api/watchlist", watchlistRouter);
app.use("/*", errorNotFound);
app.use(errorHandler);


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log("the port is listening on port " + PORT);
});
