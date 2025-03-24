const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(cors());

morgan.token('body', (req) => {
    // Solo mostrar el cuerpo de las solicitudes POST
    if (req.method === 'POST') {
        return JSON.stringify(req.body);  // Convertimos el cuerpo a string
    }
    return '';  // No mostrar el cuerpo en otros métodos
});

app.use(morgan(':method :url :status :response-time ms - :body'));
app.use(express.json());


let contacts = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]; 


app.get("/api/notes",(require,response)=>{
    response.json(contacts);
});

app.get("/api/persons/:id",(require,response)=>{
    const id = Number(require.params.id);
    console.log(id)
    const contact = contacts.find(contact => contact.id === id);
    if(contact){
        response.json(contact);
    }
    else{
        response.status(404).end("Error!! Contact not found");
    }
});




app.post("/api/persons",(require,response)=>{
    const body = require.body; // The body property contains the data sent by the client
    if(!body.name || !body.number){     // If the name or number is missing, we return an error
        return response.status(400).json({
            error: " Name or Number missing"
        });
    }
    
    if(contacts.find(contact => contact.name === body.name)){ // if the name is already in the contacts array, we return an error
        return response.status(400).json({
            error: "Name must be unique "
        }); 
    }

    const contact = {
        id: Math.floor(Math.random()*1000), // Generate a random id between 1 and 1000
        name: body.name,
        number:body.number
    }
    contacts = contacts.concat(contact); // Add the new contact to the contacts array 
    response.json(contact);

});

app.delete("/api/persons/:id",(require,response)=>{
    const id = Number(require.params.id);
    contacts = contacts.filter(contact => contact.id !== id);
    response.status(204).end("Eliminado correctamente");
})


app.get("/",(require,response)=>{
    const now = new Date().toLocaleString(
        "es-CO",{
            timeZone: "America/Bogota",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "long"
        }
     );
     let numPersons = contacts.length;

    response.send(`<h1>Hello World!</h1>
        <p>Phonebook has info for ${numPersons} people </p>
        <p>${now}</p>`);
}
);





const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})











