const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
// const url = 'mongodb://fullstack:sekred@ds211088.mlab.com:11088/fullstack-notes'
// mongodb://<dbuser>:<dbpassword>@ds245478.mlab.com:45478/hjperson
// read only permission user
// const url = 'mongodb://risto:p2assristo@ds245478.mlab.com:45478/hjperson'
// update also permissioin user
const url = 'mongodb://raija:p2assraija@ds245478.mlab.com:45478/hjperson'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

module.exports = Person

/*
let persons = [
    {
        name: 'Maija Kannisto',
        number: '04055512345',
        id: 1
    }]
*/