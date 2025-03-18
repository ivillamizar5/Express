const express = require('express');
const app = express();

app.use(express.json()) // This middleware is used to parse the JSON data sent to the server


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]




app.get('/', (request, response) => {
  // send method is used to send the HTTP response
  // response.send('<h1>Hello World!</h1>') // send a string
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes) // send the notes array as a JSON response
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
  const note = request.body // The body property contains the data sent by the client
  console.log(note)
  response.json(note)   // The response is sent back to the client as a JSON object
})


const PORT = 4000
app.listen(PORT)
console.log(`Server running on port ${PORT}`)