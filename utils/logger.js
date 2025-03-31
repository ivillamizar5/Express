const info =(...params)=>{
    console.log(...params) // Log the parameters to the console
}

const error = (...params)=>{
    console.error(...params) // Log the parameters to the console as an error
}

module.exports = {
    info,
    error
} // Export the info and error functions so they can be used in other files