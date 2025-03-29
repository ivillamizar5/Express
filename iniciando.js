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


app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)

  // If the note is found, we return it. Otherwise, we return 404 status code.
  if (note) {
    response.json(note)
  } else {
    response.status(400).send('Error 404: Note not found');
  }
})



app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).send("Note deleted successfully")
})

app.post('/api/notes', (request, response) => {
  const body = request.body // The body property contains the data sent by the client



  const note = {
    id: Math.floor(Math.random() * 1000), // Generate a random id between 1 and 1000
    content: body.content,
    important: body.important || false 
  }

  notes = notes.concat(note) // Add the new note to the notes array


  response.json(note)   // The response is sent back to the client as a JSON object


})




const PORT =  process.env.PORT || 3001 // The port is set to the value of the PORT environment variable or 3001 if not set
app.listen(PORT)
console.log(`Server running on port ${PORT}`)


