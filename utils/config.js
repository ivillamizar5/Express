require("dotenv").config();

const PORT = process.env.PORT || 3001; // The port number is set to the value of the PORT environment variable or 3001 if not defined
const MONGODB_URI = process.env.MONGODB_URI; // The MongoDB URI is set to the value of the MONGODB_URI environment variable


module.exports = {
  PORT,
  MONGODB_URI,
};