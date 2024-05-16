const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("logger");
const userRouter = require("./routes/user.router.js");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error.middleware.js");
const connectDB = require('./config/mongodb.js')


// Connect to Database
connectDB();

// CREATING EXPRESS APP
const app = express();

//Allow requests from any origin
app.use(cors({}));

// MIDDLEWARE
app.use(bodyParser.json());

// LOGGER MIDDLEWARE
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(cookieParser());

app.use("/api/v1/users", userRouter);


app.use(errorHandler);

// STARTING THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
