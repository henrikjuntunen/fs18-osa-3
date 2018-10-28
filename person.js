const mongoose = require('mongoose')

const url = 'mongodb://user:pw@ds245478.mlab.com:45478/hjperson'

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