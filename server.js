const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("logger");
const router = require("./routes/index.router.js");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error.middleware.js");
const connectDB = require("./config/mongodb.js");
const path = require('path');



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

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use("/api/v1/", router);

app.use(errorHandler);

// STARTING THE SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
