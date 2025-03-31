
const notesRouter  = require('express').Router(); // Import the express router
const Note = require('../models/note.js'); // Import the Note model

notesRouter.get('/', (request, response) => {
  Note.find({})
  .then(notes => {
    response.json(notes) // send the notes array as a JSON response
  })
})


notesRouter.get('/:id', (request, response, next) => {
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

notesRouter.post('/', (request, response) => {
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


notesRouter.put('/:id',(request,response,next)=>{

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



notesRouter.delete('/:id', (request, response, next) => {

  Note.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).send('Note deleted successfully') // send a 204 status code if the note is deleted successfully
  })
  .catch(error => next(error)) // If an error occurs, pass it to the next middleware
  
})

module.exports = notesRouter; // Export the notesRouter so it can be used in other files