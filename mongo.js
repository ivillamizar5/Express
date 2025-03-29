const mongoose = require('mongoose')
require('dotenv').config()

const password = process.env.password // The password is passed as a command line argument
const user = process.env.user // The user is passed as a command line argument

const url = `mongodb+srv://${user}:${password}@cluster0.umkoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const notes = [{
  content: 'HTML is easy',
  important: true,
},
{
  content: 'Browser can execute only JavaScript',
  important: false,
},
{
  content: 'GET and POST are the most important methods of HTTP protocol',
  important: true,
},
{
  content: 'CSS is used to style HTML documents',
  important: false,
},
{
  content: 'JavaScript is a programming language',
  important: true,
}
]

// Note.insertMany(notes)
// .then(() => {
//   console.log('Notas guardadas!');
//   mongoose.connection.close();
// })
// .catch((err) => {
//   console.error('Error al guardar las notas:', err);
//   mongoose.connection.close();
// });

Note.find({important:true}).then(result => { // {} means all documents in the collection
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
