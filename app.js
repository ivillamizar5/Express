

//const morgan = require('morgan');

const config = require("./utils/config.js");
const express = require('express');
const app = express();
const cors = require('cors');
const noteRouter = require("./controllers/note.js"); // Import the note router
const middleware = require("./utils/middlewares.js"); // Import the middleware module
const logger = require("./utils/logger.js");
const mongoose = require('mongoose');

const uri = config.MONGODB_URI; // MongoDB connection string from config

mongoose.set('strictQuery', false) 
logger.info("connected to MongoDB", uri); 

//connect to MongoDB
mongoose.connect(uri)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors());
app.use(express.static('dist')) // Serve static files from the 'dist' directory
app.use(express.json()) // This middleware is used to parse the JSON data sent to the server
app.use(middleware.requestLogger) // Log all requests to the console


app.use("/api/notes", noteRouter); // Use the note router for all requests to /api/notes


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app



