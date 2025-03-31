const app = require('./app.js'); // Import the app module
const config = require("./utils/config.js"); // Import the config module
const logger = require("./utils/logger.js"); // Import the logger module


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`); // Log the server start message
    }
);

