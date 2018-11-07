const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
// const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes'
// mongodb://<dbuser>:<dbpassword>@ds245478.mlab.com:45478/hjperson
// read only permission user
// const url = 'mongodb://risto:p2assristo@ds245478.mlab.com:45478/hjperson'
// update also permissioin user

if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}


const url = process.env.MONGODB_URI
//const url = 'mongodb://raija:p2assraija@ds245478.mlab.com:45478/hjperson'

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