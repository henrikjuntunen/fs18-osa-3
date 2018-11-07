const mongoose = require('mongoose')
const Schema = mongoose.Schema;


if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}


const url = process.env.MONGODB_URI


mongoose.connect(url)

let personSchema = new Schema({
    name: String,
    number: String,
    id: Number  
})

let Person = mongoose.model('Person', personSchema)

/*
const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})
*/

// assign a function to the "statics" object of our personSchema
personSchema.statics.formatPerson = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
} 

module.exports = Person

/*
let persons = [
    {
        name: 'Maija Kannisto',
        number: '04055512345',
        id: 1
    }]
*/