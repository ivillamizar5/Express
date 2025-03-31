const logger = require('./logger.js'); // Import the logger module

const requestLogger =(request, response, next)=>{
    logger.info("Method:", request.method); // Log the HTTP method of the request
    logger.info("Path:", request.path); // Log the path of the request
    logger.info("Body:", request.body); // Log the body of the request
    logger.info("----"); // Log a separator line
    next(); // Call the next middleware function in the stack
}

const unknownEndpoint = (request, response) => { // controlador de solicitudes con endpoint desconocido
    response.status(404).send({ error: 'unknown endpoint' })
  }


  // Este middlewere debe id al final, ya que es el que maneja los errores de la aplicacion
  const errorHandler = (error, request, response, next) => {  // cuando hay un error en la solicitud de busqueda "id" erronea
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') { // cuando se intenta crear un nota sin contenido
        return response.status(400).json({ error: error.message })
    }
    next(error);
  }
  

module.exports = {
    requestLogger, // Export the requestLogger function
    unknownEndpoint, // Export the unknownEndpoint function
    errorHandler // Export the errorHandler function
} // Export all the middleware functions as an object