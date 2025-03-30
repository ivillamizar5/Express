require("dotenv").config(); // This line loads environment variables from a .env file into process.env
const express = require('express');

const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.static('dist'))
app.use(cors());
app.use(express.json()) // This middleware is used to parse the JSON data sent to the server
const Note = require('./models/note.js')

app.get('/', (request, response) => {
  // send method is used to send the HTTP response
  // response.send('<h1>Hello World!</h1>') // send a string
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
  .then(notes => {
    response.json(notes) // send the notes array as a JSON response
  })
})


app.get('/api/notes/:id', (request, response, next) => {
  Note.findById(request.params.id) // Find a note by its ID
  .then(note => {
    if(note){
      response.json(note) // send the note as a JSON response
    }else{
      response.status(404).send('Error 404: Note not found') // If the note is not found, send a 404 error
    }
  })
  .catch(error => next(error)) // If an error occurs, pass it to the next middleware

})


app.post('/api/notes', (request, response) => {
  const body = request.body // The body property contains the data sent by the client

  if(body.content === undefined){ // If the content property is not defined, we return a 400 status code
    return response.status(400).json({
      error:"content missing"
    })
  }

  const note = new Note({ // Create a new note object
    content: body.content,
    important: body.important || false 
    } 
  )

  note.save() // Save the note to the database 
  .then(saveNote => {
    response.json(saveNote) // The response is sent back to the client as a JSON object
    }
  )
  .catch(error => {
    console.log('Error saving note:', error.message)
    response.status(500).json({ error: 'Internal Server Error' })
  })

})


app.put('/api/notes/:id',(request,response,next)=>{

  const body = request.body // The body property contains the data sent by the client
  const note = {
    content: body.content,
    important:body.important // If the important property is not defined, set it to false
  }

  Note.findByIdAndUpdate(request.params.id,note,{new:true}) // new:true option returns the updated document
  .then(updatedNote => {
    response.json(updatedNote) // send the updated note as a JSON response
    }
  ).catch(error => next(error)) // If an error occurs, pass it to the next middleware
})



app.delete('/api/notes/:id', (request, response, next) => {

  Note.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).send('Note deleted successfully') // send a 204 status code if the note is deleted successfully
  })
  .catch(error => next(error)) // If an error occurs, pass it to the next middleware
  
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint)



const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}
// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler)


const PORT =  process.env.PORT || 3001 // The port is set to the value of the PORT environment variable or 3001 if not set
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


